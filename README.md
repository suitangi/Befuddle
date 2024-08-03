# Befuddle
A Magic: The Gathering card art letter guessing game similar to Hangman. With daily new puzzles and a free play mode.

## https://befuddle.xyz/

[![Page Deployment](https://github.com/suitangi/Befuddle/actions/workflows/static.yml/badge.svg)](https://github.com/suitangi/Befuddle/actions/workflows/static.yml)

# Updating Befuddle
Run `node ./maintenance/update.js` from the root directory of the repo

The script accepts the following flags:
- `-nd` or `-nodownload`: Skips downloading the bulk data from Scryfall
- `-daily`: Adds 50 days to the Daily mode

# Todo:


### Misc/Bugs
-   Migrate mana and color symbols to https://mana.andrewgioia.com/icons.html
-   Better daily share copy pasta (emojis!)/discord spoilers mode
-   More Easter eggs

### Options menu:
-   Discord Spoilers for guesses

# Stretch:
-   Discord bot integration
-   Global stats

# Special Thanks
-   For beta testing and for helping conceptualize the idea, the one an only [G-Jayakar](https://github.com/G-Jayakar).
-   Beta testing and pro bug finder Ksax.

# Changelog
```
7/31/2024: Trimmed card database; accents are no longer free and will correspond to letters
7/29/2024: Routine card update; a couple more new Dailies; added maintenance
6/3/2024: Routine card update; new Dailies
4/13/2024: Routine card update; new Daily
2/23/2024: Routine card update; added new Daily Befuddles, added Ko-Fi button
1/25/2024: Small bug fix (daylight savings 1 hour off bug)
1/2/2024: Routine card update, added new daily Befuddles
7/6/2023: Switch to Scryfall Collections API (free play)
7/5/2023: Small fix for daily index system
7/2/2023: Routine card list update
5/6/2023: Updated cards list and new year of daily befuddles
6/20/2022: Daily Befuddle Bug fixes
5/8/2022: Stability and optimization fixes
5/4/2022: Stats launch
5/1/2022: First Daily Befuddle Launch
4/28/2022: Befuddle launched
4/25/2022: First MTGHangman game played
```
