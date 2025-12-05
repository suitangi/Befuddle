# Befuddle
A Magic: The Gathering card art letter guessing game similar to Hangman. With daily new puzzles and a free play mode.

## https://befuddle.xyz/

[![Page Deployment](https://github.com/suitangi/Befuddle/actions/workflows/static.yml/badge.svg)](https://github.com/suitangi/Befuddle/actions/workflows/static.yml)

© Ignatius Liu, 2025

# Updating Befuddle
Run `node ./maintenance/update.js` from the root directory of the repo. The script accepts the following flags:
- `-nd` or `-nodownload`: Skips downloading the bulk data from Scryfall
- `-daily`: Adds 30 days to the Daily mode

Then commit/push the changes.

# Todo:

### Misc/Bugs
-   Migrate mana and color symbols to https://mana.andrewgioia.com/icons.html
-   Add statusCode checks and backoffs
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

# Disclaimer and Credits
Portions of Befuddle are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. Befuddle is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.

- Card Data and Images: [Scryfall](https://scryfall.com/)
- Font: [Wizards of the Coast](https://company.wizards.com/en)

# Changelog
```
12/5/2025: Card update; new dailies
10/6/2025: Card update; new dailies
8/14/2025: Card update; new dailies
6/25/2025: Card update; new dailies
4/26/2025: Card update; new dailies
2/26/2025: Card update; new dailies
1/30/2024: New dailies
12/25/2024: Merry Christmas! New dailies
12/07/2024: Added new error message when Daily needs an update
10/23/2024: Routine card update; new Dailies
8/19/2024: New Dailies
8/12/2024: Card update; added TCGPlayer URL to Free Mode
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
