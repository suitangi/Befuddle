// ════════════════════════════════════════════════════════
//  Durable Object: ConfigStore (SQLite-backed, zero lag)
// ════════════════════════════════════════════════════════

export class ConfigStore {
    constructor(ctx, env) {
        this.ctx = ctx;
        this.sql = ctx.storage.sql;

        // Create table on first-ever instantiation (idempotent)
        this.sql.exec(`
          CREATE TABLE IF NOT EXISTS configs (
            key   TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            expires_at INTEGER NOT NULL
          )
        `);
    }

    async fetch(request) {
        const url = new URL(request.url);
        const action = url.pathname.slice(1); // "get" | "put" | "delete"
        const key = url.searchParams.get("key");

        // ── PUT ──
        if (action === "put") {
            const { value, ttl } = await request.json();
            const expiresAt = Date.now() + ttl * 1000;

            this.sql.exec(
                `INSERT OR REPLACE INTO configs (key, value, expires_at) VALUES (?, ?, ?)`,
                key, value, expiresAt
            );

            // Schedule an alarm to clean up after TTL
            const currentAlarm = await this.ctx.storage.getAlarm();
            if (!currentAlarm || expiresAt < currentAlarm) {
                await this.ctx.storage.setAlarm(expiresAt);
            }

            return new Response("OK");
        }

        // ── GET ──
        if (action === "get") {
            const rows = this.sql.exec(
                `SELECT value, expires_at FROM configs WHERE key = ?`, key
            ).toArray();

            if (rows.length === 0 || rows[0].expires_at < Date.now()) {
                // Lazy cleanup of expired entry
                if (rows.length > 0) {
                    this.sql.exec(`DELETE FROM configs WHERE key = ?`, key);
                }
                return new Response("{}", {
                    headers: { "Content-Type": "application/json" },
                });
            }

            return new Response(rows[0].value, {
                headers: { "Content-Type": "application/json" },
            });
        }

        // ── DELETE ──
        if (action === "delete") {
            this.sql.exec(`DELETE FROM configs WHERE key = ?`, key);
            return new Response("OK");
        }

        return new Response("Unknown action", { status: 400 });
    }

    // Alarm handler — periodically sweeps expired rows
    async alarm() {
        this.sql.exec(`DELETE FROM configs WHERE expires_at < ?`, Date.now());

        // If there are still rows left, schedule the next alarm for the soonest expiry
        const next = this.sql.exec(
            `SELECT MIN(expires_at) as next_expiry FROM configs`
        ).toArray();

        if (next.length > 0 && next[0].next_expiry !== null) {
            await this.ctx.storage.setAlarm(next[0].next_expiry);
        }
    }
}

// ════════════════════════════════════════════════════════
//  Helpers to talk to the Durable Object
// ════════════════════════════════════════════════════════

function getConfigStub(env) {
    // Single global instance — all config is stored in one DO
    const id = env.CONFIG_STORE.idFromName("global");
    return env.CONFIG_STORE.get(id);
}

async function putConfig(env, key, value, ttlSeconds) {
    const stub = getConfigStub(env);
    await stub.fetch(new Request(`https://do/put?key=${encodeURIComponent(key)}`, {
        method: "POST",
        body: JSON.stringify({ value: JSON.stringify(value), ttl: ttlSeconds }),
        headers: { "Content-Type": "application/json" },
    }));
}

async function getConfig(env, key) {
    const stub = getConfigStub(env);
    const res = await stub.fetch(`https://do/get?key=${encodeURIComponent(key)}`);
    return await res.text();
}

async function deleteConfig(env, key) {
    const stub = getConfigStub(env);
    await stub.fetch(`https://do/delete?key=${encodeURIComponent(key)}`);
}

// ════════════════════════════════════════════════════════
//  Main Worker
// ════════════════════════════════════════════════════════

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Handle CORS Preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        // DOOR 1: The Token Exchange
        if (url.pathname.replace(/\/$/, "") === "/token" && request.method === "POST") {
            const { code } = await request.json();

            const res = await fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    client_id: String(env.CLIENT_ID),
                    client_secret: env.CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: "https://befuddle.xyz",
                }).toString(),
            });

            const data = await res.json();
            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
        }

        // DOOR 2: The Config Fetcher (now reads from Durable Object — instant consistency)
        if (url.pathname.replace(/\/$/, "") === "/config" && request.method === "GET") {
            const channelId = url.searchParams.get("channelId");
            const userId = url.searchParams.get("userId");

            if (!channelId || !userId) {
                return new Response("Missing params", { status: 400 });
            }

            const intentKey = `${channelId}:${userId}`;
            const data = await getConfig(env, intentKey);

            return new Response(data || "{}", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            });
        }

        if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

        const signature = request.headers.get("x-signature-ed25519");
        const timestamp = request.headers.get("x-signature-timestamp");
        const body = await request.text();

        const isVerified = await verifyDiscordRequest(signature, timestamp, body, env.PUBLIC_KEY);
        if (!isVerified) {
            return new Response("Invalid request signature", { status: 401 });
        }

        const interaction = JSON.parse(body);

        // PING (Type 1)
        if (interaction.type === 1) {
            return new Response(JSON.stringify({ type: 1 }), {
                headers: { "content-type": "application/json" },
            });
        }

        // Slash command or Standard Launch Activity Menu (Type 2 / 4)
        if (interaction.type === 2 || interaction.type === 4) {
            const { name } = interaction.data;
            const channelId = interaction.channel_id;
            const userId = interaction.member?.user.id || interaction.user.id;
            const intentKey = `${channelId}:${userId}`;

            if (name === "daily") {
                await putConfig(env, intentKey, { mode: "daily" }, 300);
            } else {
                await deleteConfig(env, intentKey);
            }
            return new Response(JSON.stringify({ type: 12 }), {
                headers: { "content-type": "application/json" },
            });
        }

        // Message component (Type 3)
        if (interaction.type === 3) {
            const { custom_id } = interaction.data;
            const channelId = interaction.channel_id;
            const userId = interaction.member?.user.id || interaction.user.id;
            const intentKey = `${channelId}:${userId}`;

            if (custom_id === "play_daily") {
                await putConfig(env, intentKey, { mode: "daily" }, 300);
            } else if (custom_id === "launch") {
                await deleteConfig(env, intentKey);
            } else {
                await putConfig(env, intentKey, { mode: "free", cardId: custom_id }, 300);
            }
            return new Response(JSON.stringify({ type: 12 }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        // LAUNCH (Type 12)
        if (interaction.type === 12) {
            return new Response(JSON.stringify({ type: 12 }), {
                headers: { "content-type": "application/json" },
            });
        }

        return new Response("Unknown interaction", { status: 400 });
    },
};

// ════════════════════════════════════════════════════════
//  Security helpers
// ════════════════════════════════════════════════════════

async function verifyDiscordRequest(signature, timestamp, body, publicKey) {
    if (!signature || !timestamp) return false;
    const encoder = new TextEncoder();
    const data = encoder.encode(timestamp + body);
    const signatureBin = hexToBinary(signature);
    const publicKeyBin = await crypto.subtle.importKey(
        "raw",
        hexToBinary(publicKey),
        { name: "NODE-ED25519", namedCurve: "NODE-ED25519" },
        false,
        ["verify"]
    );
    return await crypto.subtle.verify("NODE-ED25519", publicKeyBin, signatureBin, data);
}

function hexToBinary(hex) {
    const buf = new Uint8Array(hex.length / 2);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return buf;
}
