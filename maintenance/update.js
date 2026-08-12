// node update.js to run
// options:
// - daily   to add cards to daily befuddle
// - nd or -nodownload   will not download latest bulk card data

const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');
const zlib = require('zlib');
const DAILY_CARDS = 50;

// Bulk data is now served as a gzipped JSONL file (.jsonl.gz). Each line in the
// uncompressed file is its own JSON object, with no wrapping array. We download
// the .gz to disk and un-gzip it ourselves (it is not transfer compression).
const BULK_GZ = './ignore/mtgCards.jsonl.gz';
const BULK_JSONL = './ignore/mtgCards.jsonl';

function deleteCardsJson() {
  // Clean up both the gzipped archive and the unpacked JSONL from prior runs.
  [BULK_GZ, BULK_JSONL].forEach((filename) => {
    if (fs.existsSync(filename)) {
      console.log("Deleting " + filename + "...");
      fs.unlinkSync(filename);
      console.log("Deleted " + filename + " successfully.");
    }
  });
  getBulkData();
}

function getBulkData() {
  console.log("Getting bulk data...");

  const https_options = {
    host: 'api.scryfall.com',
    path: '/bulk-data',
    headers: {
      'User-Agent': 'BefuddleApp/24.8.11',
      'Accept': 'application/json;q=0.9,*/*;q=0.8'
    }
  }

  //'https://api.scryfall.com/bulk-data'
  https.get(https_options, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // Bulk files are now served as gzipped JSONL via jsonl_download_uri.
      // The old download_uri (JSON) has been retired.
      let bulkEntry = JSON.parse(data)['data'][1];
      console.log("Downloading from: " + bulkEntry['jsonl_download_uri']);
      let url = new URL(bulkEntry['jsonl_download_uri']);

      let dw_option = {
        host: url.hostname,
        path: url.pathname,
        headers: {
          'User-Agent': 'BefuddleApp/24.8.11',
          'Accept': 'application/json;q=0.9,*/*;q=0.8'
        }
      }

      https.get(dw_option, (res) => {
        // Save the raw .jsonl.gz archive first; we un-gzip it on disk next.
        const filePath = fs.createWriteStream(BULK_GZ);
        res.pipe(filePath);
        filePath.on('finish', () => {
          filePath.close();
          console.log('Bulk Data Download Completed (.jsonl.gz)');
          gunzipBulkData();
        })
      })
    });

  }).on("error", (err) => {
    console.log("URI Error: " + err.message);
    throw (err);
  });
}

function gunzipBulkData() {
  console.log("Un-gzipping " + BULK_GZ + " ...");
  fs.createReadStream(BULK_GZ)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(BULK_JSONL))
    .on('finish', () => {
      console.log('  Decompressed to ' + BULK_JSONL);
      start();
    })
    .on('error', (err) => {
      console.log("Gunzip Error: " + err.message);
      throw err;
    });
}

// JSONL: each line is a standalone JSON object (no wrapping array). Read the
// file line-by-line and parse each line into an array element so the rest of
// the script can keep treating it like the old bulk JSON array.
function loadCardsJsonl() {
  console.log("Loading " + BULK_JSONL + " ...");
  const content = fs.readFileSync(BULK_JSONL, 'utf8');
  return content.split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line));
}

function getDateNumber() {
  d1 = new Date('5/6/2022 0:00');
  d2 = new Date();
  dd = Math.floor((d2.getTime() - d1.getTime()) / 86400000) - 1;
  return dd;
}

//helper function to see if a and b have intersecting elements
function arrayIntersect(a, b) {
  return a.filter(e => e.includes(b)).length !== 0;
}

function start() {

  let d = loadCardsJsonl();
  let historical = require('../data/historical.json');

  const setTypeExclude = ['memorabilia', 'token'];
  const layoutExclude = ['vanguard', 'token', 'double_faced_token', 'art_series', 'scheme', 'planar', 'emblem',
    'reversible_card', 'host', 'augment'
  ];
  const setNameExclude = ['Mystery Booster Playtest Cards 2021', 'Mystery Booster Playtest Cards 2019', 'Unfinity Sticker Sheets'];
  const promoExclude = ['playtest', 'poster'];
  const setExcludeDaily = ['Unfinity', 'Unhinged', 'Unsanctioned', 'Unstable', 'Unglued', 'The List (Unfinity Foil Edition)'];
  const dfc = ['transform', 'modal_dfc'];

  const toKeep = ['name', 'layout', 'mana_cost', 'colors', 'type_line'];
  const img_uri = 'image_uris';
  const toKeepImg = ['normal', 'art_crop'];
  const bannedChars = ['_', '®'];

  let cleanList = [];
  let idList = [];

  let progress = 1;
  console.log('Started list building and card processing .. ');
  for (var i = 0; i < d.length; i++) {

    let banned = false;
    bannedChars.forEach((c) => {
      if (d[i].name.includes(c)) {
        banned = true;
      }
    });
    if (banned) //exclude cards with banned characters in the name
      continue;

    if (
      setTypeExclude.includes(d[i].set_type) || //excluded set types
      layoutExclude.includes(d[i].layout) || //excluded layouts
      setNameExclude.includes(d[i].set_name) || //excluded set names
      (d[i].promo_types && arrayIntersect(d[i].promo_types, promoExclude)) || //excluded promos
      d[i].oversized || //exclude oversized cards
      d[i].content_warning || //exclude content warning cards
      d[i].games == undefined || //exclude cards without games
      !d[i].games.includes('paper') || //only include paper cards
      d[i].flavor_name != undefined || //exclude cards with flavor names
      (!dfc.includes(d[i].layout) && d[i].image_uris == undefined) || //not dfc and no art images
      (!dfc.includes(d[i].layout) && (d[i].image_uris.art_crop == undefined || d[i].image_uris.normal == undefined)) || //not dfc and doesn't have art crop
      (dfc.includes(d[i].layout) && d[i].card_faces == undefined) //dfc and no card_faces array
    ) {
      continue;
    } else { //include the card
      let card = d[i];

      let toPush = {
        id: card.id
      };

      if (dfc.includes(d[i].layout)) { //dfc
        toPush['card_faces'] = [];
        card.card_faces.forEach((cf, j) => {
          toPush['card_faces'].push({});
          toKeep.forEach(key => {
            toPush['card_faces'][j][key] = cf[key];
          })
          toPush['card_faces'][j][img_uri] = {};
          toKeepImg.forEach(key => {
            toPush['card_faces'][j][img_uri][key] = cf.image_uris[key];
          });
        });
      } else { //not dfc
        toKeep.forEach(key => {
          toPush[key] = card[key];
        })
        toPush[img_uri] = {};
        toKeepImg.forEach(key => {
          toPush[img_uri][key] = card.image_uris[key];
        });
      }
      cleanList.push(toPush);
      idList.push(card.id);
    }
    if (i > progress * Math.floor(d.length / 10)) {
      console.log(`  ${i}/${d.length} cards processed`);
      progress++;
    }
  }

  console.log("Finished card processing, exporting cleanedCards.json ...");
  let cl = JSON.stringify(cleanList);
  fs.writeFileSync('./ignore/cleanedCards.json', cl);
  console.log("  cleanedCards.json exported.")

  console.log("Exporting cardList.json ...");
  let il = JSON.stringify(idList);
  fs.writeFileSync('./cardList.json', il);
  console.log("  cardList.json exported.")

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }

    return array;
  }

  if (process.argv.includes('-daily')) {
    console.log("Starting daily befuddle list building...");
    console.log("  Shuffling cleaned list...")
    shuffle(cleanList);
    console.log("  done shuffling, building list now")

    let days = DAILY_CARDS;
    let overlap = 2;
    let dailyList = {
      start: getDateNumber() - overlap,
      list: []
    };

    for (var loopDays = getDateNumber() - overlap; loopDays < historical.length; loopDays++) {
      dailyList.list.push({
        ...historical[loopDays]
      });
    }
    let card;
    while (days >= 0) {
      card = cleanList.pop();
      console.log(card);
      if ((card['type_line'] != undefined && !card['type_line'].includes('Basic')) && //not basic lands
        !historical.includes(card.id) && // not in historical
        !setExcludeDaily.includes(card.set_name) // not in excluded sets
      ) {
        dailyList.list.push(card);
        historical.push(card);
        days--;
      }
    }
	console.log(`Updated daily Befuddle with ${DAILY_CARDS} new cards`);
    console.log("Exporting dailyList.json ...");
    let dl = JSON.stringify(dailyList);
    fs.writeFileSync('./ignore/dailyList.json', dl);
    fs.writeFileSync('./dailyList.json', dl);
    console.log("  dailyList.json exported.")

    console.log("Updating historical.json ...");
    let hl = JSON.stringify(historical);
    fs.writeFileSync('./data/historical.json', hl);
    console.log("  historical.json exported.")
  } else {
    console.log(`To update daily list with ${DAILY_CARDS} cards please include -daily flag`);
  }

  console.log("--- All Done ---");
}

if (process.argv.includes('-nd') || process.argv.includes('-nodownload')) {
  console.log('No download mode selected');
  start();
} else {
  deleteCardsJson();
}
