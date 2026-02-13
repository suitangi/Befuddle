// --- end migration utilities ---
const canVibrate = window.navigator.vibrate;
const befuddleAppVersion = "2026.2.12";
const tcgSVG = '<svg class="tcg-svg" version="1.1" viewBox="0.0 0.0 144.0 120.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><clipPath id="p.0"><path d="m0 0l144.0 0l0 120.0l-144.0 0l0 -120.0z" clip-rule="nonzero"/></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l144.0 0l0 120.0l-144.0 0z" fill-rule="evenodd"/><path fill="#ffffff" d="m3.6983974 43.321297l0 0c-2.0432932 -5.575428 0.84098935 -11.693382 6.4422255 -13.664833l40.56652 -14.278071l0 0c2.689808 -0.94672394 5.6592407 -0.79107285 8.255051 0.4327116c2.5958138 1.2237835 4.6053696 3.4154549 5.5865936 6.0928707l21.734444 59.30565c2.0432892 5.575424 -0.8409958 11.693382 -6.44223 13.664833l-40.56652 14.278069c-5.6012383 1.9714508 -11.798353 -0.95014954 -13.841646 -6.5255814z" fill-rule="evenodd"/><path stroke="#333333" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m3.6983974 43.321297l0 0c-2.0432932 -5.575428 0.84098935 -11.693382 6.4422255 -13.664833l40.56652 -14.278071l0 0c2.689808 -0.94672394 5.6592407 -0.79107285 8.255051 0.4327116c2.5958138 1.2237835 4.6053696 3.4154549 5.5865936 6.0928707l21.734444 59.30565c2.0432892 5.575424 -0.8409958 11.693382 -6.44223 13.664833l-40.56652 14.278069c-5.6012383 1.9714508 -11.798353 -0.95014954 -13.841646 -6.5255814z" fill-rule="evenodd"/><path fill="#ffffff" d="m79.253204 21.990696l0 0c2.013565 -5.6003723 8.205383 -8.563349 13.829811 -6.6179914l40.734505 14.089097l0 0c2.700943 0.93419456 4.9071503 2.8984814 6.1332703 5.460745c1.22612 2.5622635 1.3717194 5.512615 0.4047699 8.202007l-21.369644 59.435795c-2.013565 5.6003723 -8.205383 8.563347 -13.829819 6.6179886l-40.734497 -14.089096c-5.6244316 -1.9453583 -8.551613 -8.062378 -6.538044 -13.66275z" fill-rule="evenodd"/><path stroke="#333333" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m79.253204 21.990696l0 0c2.013565 -5.6003723 8.205383 -8.563349 13.829811 -6.6179914l40.734505 14.089097l0 0c2.700943 0.93419456 4.9071503 2.8984814 6.1332703 5.460745c1.22612 2.5622635 1.3717194 5.512615 0.4047699 8.202007l-21.369644 59.435795c-2.013565 5.6003723 -8.205383 8.563347 -13.829819 6.6179886l-40.734497 -14.089096c-5.6244316 -1.9453583 -8.551613 -8.062378 -6.538044 -13.66275z" fill-rule="evenodd"/><path fill="#ffffff" d="m36.106525 18.050085l0 0c0 -5.9491396 4.822731 -10.77187 10.77187 -10.77187l43.08618 0l0 0c2.8568802 0 5.5967484 1.1348906 7.616867 3.1550074c2.020111 2.0201178 3.1550064 4.759984 3.1550064 7.6168623l0 62.960197c0 5.949135 -4.822731 10.771866 -10.771873 10.771866l-43.08618 0c-5.9491386 0 -10.77187 -4.822731 -10.77187 -10.771866z" fill-rule="evenodd"/><path stroke="#333333" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m36.106525 18.050085l0 0c0 -5.9491396 4.822731 -10.77187 10.77187 -10.77187l43.08618 0l0 0c2.8568802 0 5.5967484 1.1348906 7.616867 3.1550074c2.020111 2.0201178 3.1550064 4.759984 3.1550064 7.6168623l0 62.960197c0 5.949135 -4.822731 10.771866 -10.771873 10.771866l-43.08618 0c-5.9491386 0 -10.77187 -4.822731 -10.77187 -10.771866z" fill-rule="evenodd"/><path fill="#333333" d="m79.776436 24.556463l-4.074669 14.430754l-3.3064575 -1.0685692l-1.3463058 14.468933l-3.5430756 -0.83686066l-5.1932907 21.343666l-3.7317772 -23.917072l4.118435 1.2251434l-2.120121 -15.0548935l5.1785316 1.0673485l-2.2834625 -15.851421z" fill-rule="evenodd"/><path stroke="#303030" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m79.776436 24.556463l-4.074669 14.430754l-3.3064575 -1.0685692l-1.3463058 14.468933l-3.5430756 -0.83686066l-5.1932907 21.343666l-3.7317772 -23.917072l4.118435 1.2251434l-2.120121 -15.0548935l5.1785316 1.0673485l-2.2834625 -15.851421z" fill-rule="evenodd"/></g></svg>';
const DISCORD_APPLICATION_ID = '1389389854747525152';

// --- localStorage migration and utilities ---
function setStorage(key, value) {
  localStorage.setItem(key, value);
}

function getStorage(key) {
  return localStorage.getItem(key);
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

// Migrate from js-cookie to localStorage (run once per user)
function migrateCookiesToLocalStorage() {
  if (localStorage.getItem('__cookiesMigrated')) return;
  if (typeof Cookies !== 'undefined') {
    var keys = Object.keys(Cookies.get());
    for (var i = 0; i < keys.length; i++) {
      var name = keys[i];
      var value = Cookies.get(name);
      if (localStorage.getItem(name) === null) {
        localStorage.setItem(name, value);
      }
    }
    localStorage.setItem('__cookiesMigrated', 'true');
  }
}

migrateCookiesToLocalStorage();

//Helper: Get Query
const getParameterByName = (name, url = window.location.href) => {
  const regex = new RegExp(`[?&]${name.replace(/[\[\]]/g, '\\$&')}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  return decodeURIComponent(results[2]?.replace(/\+/g, ' ') || '');
};

//helper to see if char is an English letter
const isAlpha = (char) => {
  const code = char.toLowerCase().charCodeAt(0);
  return code >= 97 && code <= 122;
};

// Build emoji progress stconst ring from guessProgress: 🟩 for correct, 🟥 for incorrect
function buildGuessString() {
  try {
    if (!window.gameSesh || !Array.isArray(window.gameSesh.guessProgress)) return '';
    return window.gameSesh.guessProgress.map(v => v ? '🟩 ' : '🟥 ').join('');
  } catch (e) {
    console.error('buildGuessString error', e);
    return '';
  }
}

// Build lives heart string for daily mode: ❤️ for remaining, 🖤 for used
function buildDailyLivesString() {
  try {
    const total = window.game.daily.lives;
    const used = window.gameSesh.wrongGuess.length;
    const remaining = Math.max(0, total - used);
    const hearts = [];
    for (let i = 0; i < remaining; i++) hearts.push('❤️ ');
    for (let i = 0; i < used; i++) hearts.push('🖤 ');
    return hearts.join('') + ` (${remaining}/${total})`;
  } catch (e) {
    console.error('buildDailyLivesString error', e);
    return '';
  }
}

//function to request random card data from scryfall api
function requestCard(id) {

  document.getElementById("cardImage").style = "opacity:0; transition: opacity 0s;";
  document.getElementById("imageLoading").style = "";

  if (id) {
    fetchSingleCard(id);
    return;
  }

  if (window.cardQueue.length > 0) {
    loadCard(window.cardQueue.pop());
    if (window.cardQueue.length == 0) {
      window.fetchLimit = Math.min(window.fetchLimit + 5, 50);
      addCardsToQueue();
    }

  } else {
    fetchSingleCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
    window.fetchLimit = 5;
    setTimeout(() => {
      addCardsToQueue();
    }, 500);
  }

  function addCardsToQueue() {
    console.log(`Fetching ${window.fetchLimit} cards to queue.`)
    let bodydata = {
      'identifiers': []
    };
    for (var i = 0; i < window.fetchLimit; i++) {
      bodydata['identifiers'].push({
        'id': window.cardList[Math.floor(Math.random() * window.cardList.length)]
      });
    }
    let fetchUrl = 'https://api.scryfall.com/cards/collection';
    if (window.isDiscord) {
      fetchUrl = getDiscordProxiedUrl(fetchUrl);
    }
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodydata),
    }).then(response => response.json())
      .then(data => {
        window.cardQueue.push(...data['data']);
      }).catch(error => {
        console.error(error);
        fetchError();
      });
  }

  function fetchSingleCard(id) {
    let fetchUrl = 'https://api.scryfall.com/cards/' + id;
    if (window.isDiscord) {
      fetchUrl = getDiscordProxiedUrl(fetchUrl);
    }
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => loadCard(data))
      .catch(error => {
        console.error(error);
        fetchError();
      });
  }

  function fetchError() {
    $.dialog({
      title: '<span class=\"modalTitle\">Error</span>',
      content: '<span class=\"modalText\">Couldn\'t load card images and information. Check your connection and/or Scryfall API status.</span>',
      type: 'red',
      theme: window.game.theme,
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      useBootstrap: false,
      typeAnimated: true,
      backgroundDismiss: true
    });
  }
}


//function to load the card data into memory
function loadCard(data) {

  let multiFace = ['transform', 'modal_dfc'];
  if (data) {
    //setup new mtg card object
    window.mtgCard = {};
    window.mtgCard.id = data['id'];
    window.mtgCard.layout = data['layout'];
    window.mtgCard.mana_cost = data['mana_cost'];

    window.mtgCard.name = data['name'];
    window.mtgCard.colors = data['colors'];

    if (window.game.mode == 'free') {
      window.mtgCard.tcgLink =
        decodeURIComponent(data['purchase_uris']['tcgplayer'].split('u=')[1]) +
        '&sharedid=&irpid=5664169&irgwc=1&utm_source=impact&utm_medium=affiliate&utm_campaign=Suitangi';
    }

    if (multiFace.includes(window.mtgCard['layout'])) {
      window.mtgCard.card_faces = [];
      for (var i = 0; i < data['card_faces'].length; i++) {
        window.mtgCard.card_faces.push({
          mana_cost: data['card_faces'][i]['mana_cost'],
          colors: data['card_faces'][i]['colors'],
          name: data['card_faces'][i]['name'],
          image_uris: {
            normal: data['card_faces'][i]['image_uris']['normal'],
            art_crop: data['card_faces'][i]['image_uris']['art_crop'],
          }
        });
      }
    } else {
      window.mtgCard.image_uris = {
        normal: data['image_uris']['normal'],
        art_crop: data['image_uris']['art_crop'],
      };
    }

    //define gameSesh attributes
    window.gameSesh = {};
    window.gameSesh.end = false;
    window.gameSesh.wrongGuess = '';
    window.gameSesh.guesses = '';
    window.gameSesh.guessProgress = [];
    window.gameSesh.tlv = window.game[window.game.mode].lives;

    if (window.game.mode == 'daily') {
      window.gameSesh.doy = getDateNumber();
      window.gameSesh.giveUp = false;
    }

    if (window.game.mode == 'free') {
      window.gameSesh.manastate = window.game.free.manaState;
    }

    window.gameSesh.hideBlanks = window.game[window.game.mode].hideBlanks;
    window.gameSesh.card = window.mtgCard;
  } // end if(data)
  window.lives = window.game[window.game.mode].lives;

  //reset display keyboard
  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    li[i].classList.remove('correct');
    li[i].classList.remove('incorrect');
    li[i].classList.remove('redText');
    li[i].innerText = li[i].getAttribute('data-key');
  }

  document.getElementById('seeCard').style = 'display:none;';
  window.mtgCard.cf = -1;

  // select card face if multiface
  if (multiFace.includes(window.mtgCard['layout'])) {
    if (getParameterByName('cf')) //if there's a cardFace parameter, use that
      window.mtgCard.cf = parseInt(getParameterByName('cf'));
    else if (window.game.mode == 'daily') //daily mode always front face
      window.mtgCard.cf = 0;
    else //random which card face
      window.mtgCard.cf = Math.floor(Math.random() * window.mtgCard['card_faces'].length);
    let cf = window.mtgCard['card_faces'][window.mtgCard.cf];
    window.mtgCard['mana_cost'] = cf['mana_cost'];
    window.mtgCard['colors'] = cf['colors'];
    window.mtgCard['image_uris'] = cf['image_uris'];
    window.mtgCard['name'] = cf['name'];
  }

  let html = '';

  //show mana costs
  if ((window.game.mode == 'free' && window.gameSesh.manastate == 2) || (window.game.mode == 'daily')) {
    if (window.mtgCard['mana_cost'] == '') {
      html = 'No mana cost';
    } else {
      window.mtgCard.manaCost = [];
      if (window.mtgCard['layout'] == 'split' || window.mtgCard['layout'] == 'adventure' || window.mtgCard['layout'] == 'flip') {
        let tmp = window.mtgCard['mana_cost'].split(' // '); //for the double faced and split cards
        for (var i = 0; i < tmp.length; i++) {
          if (i > 0)
            window.mtgCard.manaCost.push('//');
          window.mtgCard.manaCost = window.mtgCard.manaCost.concat(tmp[i].substring(1, tmp[i].length - 1).split('}{'));
        }
      } else {
        window.mtgCard.manaCost = window.mtgCard.manaCost.concat(window.mtgCard['mana_cost'].substring(1, window.mtgCard['mana_cost'].length - 1).split('}{'));
      }

      for (var i = 0; i < window.mtgCard.manaCost.length; i++) {
        if (window.mtgCard.manaCost[i] == '')
          continue;
        else if (window.mtgCard.manaCost[i] == '//')
          html += ' // ';
        else {
          html += `<img class="manaSymbol" alt="${window.mtgCard.manaCost[i]}" src="${window.mtgSymbols[window.mtgCard.manaCost[i]]}">`;
        }
      }
    }
    html += '<br><br>';
  } //show colors
  else if ((window.game.mode == 'free' && window.gameSesh.manastate == 1)) {
    html = 'Color' + (window.mtgCard['colors'].length < 2 ? '' : 's') + ': '
    if (window.mtgCard['colors'].length == 0) {
      html += `<img class="manaSymbol" src="${window.mtgSymbols["C"]}">`;
    } else {
      for (var i = 0; i < window.mtgCard['colors'].length; i++) {
        html += `<img class="manaSymbol" alt="${window.mtgCard['colors'][i]}" src="${window.mtgSymbols[window.mtgCard['colors'][i]]}">`;
      }
    }
    html += '<br><br>';
  } else { //show nothing
    html = '';
  }

  document.getElementById('cardMana').innerHTML = html;

  var img = document.getElementById("cardImage");
  var newImg = new Image;
  newImg.onload = function () {
    img.src = this.src;
    document.getElementById("cardImage").style = "opacity:1;";
    document.getElementById("imageLoading").style = "display:none;";
  }
  let imgSrc = window.mtgCard['image_uris']['art_crop'];
  if (window.isDiscord) {
    imgSrc = getDiscordProxiedUrl(imgSrc);
  }
  newImg.src = imgSrc;

  let str = window.mtgCard['name'];

  if (window.gameSesh.hideBlanks)
    window.gameSesh.hiddenName = hideName(str, '');
  else
    window.gameSesh.hiddenName = hideName(str, '_');

  document.getElementById("cardName").innerText = window.gameSesh.hiddenName;

  if (window.gameSesh.hiddenName.length > 30) { //accomodate longer names
    document.getElementById("cardName").style = "font-size: min(25px, 5vw);";
  } else {
    document.getElementById("cardName").style = "";
  }

  document.getElementById('card').style = "";

  //save loaded game if daily
  if (window.game.mode == 'daily') {
    setStorage('daily', JSON.stringify(window.gameSesh)); //save daily game session data to local storage
  }
}

//function to laod guesses when reconnected to a game
function loadGuesses() {
  window.loadingGuesses = true;
  let g = window.gameSesh.guesses;
  window.gameSesh.wrongGuess = '';
  window.gameSesh.guesses = '';
  window.gameSesh.guessProgress = [];
  for (var i = 0; i < g.length; i++) {
    submitLetter(g.charAt(i));
  }
  window.loadingGuesses = false;
}

//letter submtted by player
function submitLetter(char) {

  if (window.gameSesh.guesses.includes(char)) //if letter already guessed, return
    return;
  window.gameSesh.guesses += char;

  let found = false;

  //search in real card name and replace with correct letter
  let uChar = char.toUpperCase();
  let s = window.mtgCard.name;
  let r = '',
    ch;
  for (var i = 0; i < s.length; i++) {
    ch = s.charAt(i);
    if (ch == char || ch == uChar || window.reverseAccentMap[ch] == char) {
      found = true;
      r += ch;
    } else {
      if (!window.gameSesh.hideBlanks) //not hidden mode
        r += window.gameSesh.hiddenName.charAt(i);
      else { //hidden mode
        if (
          window.gameSesh.guesses.includes(ch.toLowerCase()) || //letter has been guessed
          (window.accentedChars.has(ch) && window.gameSesh.guesses.includes(window.reverseAccentMap(ch).toLowerCase())) || //is accented char and accented char's mapped letter has been guessed
          (!isAlpha(ch) && !window.accentedChars.has(ch)) //not alpha and not an accented character
        )
          r += ch;
      }
    }
  }

  // record correctness of this guess (incremental method)
  if (!Array.isArray(window.gameSesh.guessProgress))
    window.gameSesh.guessProgress = [];
  window.gameSesh.guessProgress.push(found);


  if (!found) { //letter is not in card name
    window.gameSesh.wrongGuess += char;
    window.displayKeyboard[char].classList.add('incorrect');

    //medium buzz
    if (window.game.vibra && canVibrate)
      navigator.vibrate(55);

    //add to stat if not loadingGuesses
    if (!window.loadingGuesses) {
      if (!window.gameSesh.hideBlanks)
        window.stats[window.game.mode].acc[1]++;
      else
        window.stats[window.game.mode].acc[3]++;
      setStorage(window.game.mode + 'Stats', JSON.stringify(window.stats[window.game.mode])); //save game stats to local storage
    }

    if (window.lives != -1) {
      window.lives--;
      window.displayKeyboard[char].classList.add('redText');

      //set lives text on keyboard
      for (e of document.getElementsByClassName('incorrect')) {
        e.innerText = window.lives;
      }

      if (window.lives == 0) { //game lost
        window.gameSesh.end = true;
        document.getElementById('seeCard').style = '';
        if (window.game.mode == 'free') {
          gameLostFree();
        } else if (window.game.mode == 'daily') {
          if (!window.gameSesh.submitted) {
            window.gameSesh.submitted = true;
            submitDailyData('x');
          }
          gameLostDaily();
        }
      }
    }
  } else { //letter is in cardname
    window.displayKeyboard[char].classList.add('correct');
    window.gameSesh.hiddenName = r;
    document.getElementById("cardName").innerText = window.gameSesh.hiddenName;

    //short buzz
    if (window.game.vibra && canVibrate)
      navigator.vibrate(15);

    //add to stat if not loadingGuesses
    if (!window.loadingGuesses) {
      if (!window.gameSesh.hideBlanks)
        window.stats[window.game.mode].acc[0]++;
      else
        window.stats[window.game.mode].acc[2]++;
      setStorage(window.game.mode + 'Stats', JSON.stringify(window.stats[window.game.mode])); //save game stats to local storage
    }

    //player win!
    if (window.gameSesh.hiddenName == window.mtgCard.name) {
      window.gameSesh.end = true;
      document.getElementById('seeCard').style = '';

      if (window.game.mode == 'free') {
        gameWinFree();
      } else if (window.game.mode == 'daily') {
        if (!window.gameSesh.submitted) {
          window.gameSesh.submitted = true;
          submitDailyData(window.gameSesh.wrongGuess.length);
        }
        gameWinDaily();
      }
    }
  }

  //save game session data to respective mode cookie
  setStorage(window.game.mode, JSON.stringify(window.gameSesh)); //save game session data to local storage
}

//handler for see card button
function seeCardHandler() {
  if (window.gameSesh.hiddenName == window.mtgCard.name) {
    if (window.game.mode == 'free') {
      gameWinFree();
    } else if (window.game.mode == 'daily') {
      gameWinDaily();
    }
  } else { //lost
    if (window.game.mode == 'free') {
      gameLostFree();
    } else if (window.game.mode == 'daily') {
      gameLostDaily();
    }
  }
}

//handler for game lost scenario in free mode
function gameLostFree() {

  if (window.gameSesh.tlv != -1) {
    if (!window.gameSesh.hideBlanks) {
      window.stats.free.wr[0][window.gameSesh.tlv - 1][1]++;
    } else {
      window.stats.free.wr[1][window.gameSesh.tlv - 1][1]++;
    }
    setStorage('freeStats', JSON.stringify(window.stats.free)); //save free mode stats to local storage
  }

  $.confirm({
    title: "<span class=\"modalTitle\">Totally Lost</span>",
    content: getCardHtml(),
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      tcg: {
        text: `${tcgSVG}`,
        btnClass: 'tcg-btn',
        action: function () {
          window.open(window.mtgCard.tcgLink, '_blank').focus();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function (linkButton) {
          let str = 'Befuddle:\n' + buildGuessString() + '\n' +
            (window.gameSesh.tlv == -1 ? 'Gave Up' : ('X/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '');
          const url = 'https://befuddle.xyz/?cardId=' + window.mtgCard.id + (window.mtgCard.cf != -1 ? ('&cf=' + window.mtgCard.cf) : '')
          clipboardHandler(linkButton, str, url);
          return false;
        }
      },
      close: {
        text: "Next Card",
        btnClass: 'btn-blue',
        keys: ['enter'],
        action: function () {
          if (window.cardList)
            requestCard();
          else
            loadGame();
        }
      }
    }
  });
}

//handler for game lost scenario in daily mode
function gameLostDaily() {

  if (window.dailyModal !== null) {
    window.dailyModal.open();
    return;
  }

  //new daily stat, not just a refresh
  let dn = getDateNumber();
  if (window.stats.daily.doy != dn) {
    window.stats.daily.doy = dn;
    window.stats.daily.streak = 0;
    if (!window.gameSesh.hideBlanks) {
      window.stats.daily.WL[1]++;
    } else {
      window.stats.daily.WL[3]++;
    }
    setStorage('dailyStats', JSON.stringify(window.stats.daily)); //save daily stats to local storage
  }

  let imgSrc = 'https://storage.ko-fi.com/cdn/cup-border.png';
  if (window.isDiscord) {
    sendDiscordMessageUpdate();
    imgSrc = getDiscordProxiedUrl(imgSrc);
  };

  window.dailyModal = $.confirm({
    title: "<span class=\"modalTitle\">Totally Lost</span>",
    content: getCardHtml() + '<div id="dailyTimerDisplay"></div>',
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      kofi: {
        text: `<img src="${imgSrc}" alt="Ko-Fi">`,
        btnClass: 'btn-blue kofi-btn',
        action: function () {
          buyDrink();
          return false;
        }
      },
      free: {
        text: "Free Play",
        btnClass: 'btn-purple',
        action: function (linkButton) {
          window.gameSesh.end = true;
          window.game.mode = 'free';
          if (getStorage('free')) {
            window.gameSesh = JSON.parse(getStorage('free'));
            window.mtgCard = window.gameSesh.card;
          }
          if (!window.gameSesh.end)
            continueGameModal();
          else
            loadGame();
        }
      },
      stats: {
        text: "Stats",
        btnClass: 'btn-blue',
        action: function () {
          statsModal();
        }
      },
      link: window.isDiscord ? undefined : {
        text: "Share",
        btnClass: 'btn-green',
        action: function (linkButton) {
          let d = new Date();
          let str =
            `Daily Befuddle ${d.toLocaleDateString("en-US")}\n${buildGuessString()}\n${buildDailyLivesString()}${(window.gameSesh.hideBlanks ? '*' : '')}`;
          clipboardHandler(linkButton, str, 'https://befuddle.xyz/');
          return false;
        }
      }
    }
  });
}

//handler for winning the game in daily mode
function gameWinDaily() {

  if (window.dailyModal !== null) {
    window.dailyModal.open();
    return;
  }

  let wr = window.gameSesh.wrongGuess.length;
  let dn = getDateNumber();

  //new daily stat, not just a refresh
  if (window.stats.daily.doy != dn) {
    window.stats.daily.doy = dn;
    window.stats.daily.streak++;

    //streak data
    if (window.stats.daily.streak > window.stats.daily.maxStk)
      window.stats.daily.maxStk = window.stats.daily.streak;
    if (!window.gameSesh.hideBlanks) {
      window.stats.daily.score[0][wr]++;
      window.stats.daily.WL[0]++;
    } else {
      window.stats.daily.score[1][wr]++;
      window.stats.daily.WL[2]++;
    }
    setStorage('dailyStats', JSON.stringify(window.stats.daily)); //save daily stats to local storage

    //vibrate if on
    if (window.game.vibra && canVibrate)
      navigator.vibrate([400]);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6
      },
      zIndex: 900719925,
      colors: window.game.theme == 'dark' ? ['#eee'] : ['#333']
    });

  }

  let imgSrc = 'https://storage.ko-fi.com/cdn/cup-border.png';
  if (window.isDiscord) {
    imgSrc = getDiscordProxiedUrl(imgSrc);
    sendDiscordMessageUpdate();
  };

  window.dailyModal = $.confirm({
    title: `<span class=\"modalText\">${getWinTerms(wr)}${(wr != 0 ? (` — ${wr} wrong`) : '')}</span>`,
    content: `${getCardHtml()}<div id="dailyTimerDisplay"></div>`,
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      kofi: {
        text: `<img src="${imgSrc}" alt="Ko-Fi">`,
        btnClass: 'btn-blue kofi-btn',
        action: function () {
          buyDrink();
          return false;
        }
      },
      free: {
        text: "Free Play",
        btnClass: 'btn-purple',
        action: function (linkButton) {
          window.gameSesh.end = true;
          window.game.mode = 'free';
          if (getStorage('free')) {
            window.gameSesh = JSON.parse(getStorage('free'));
            window.mtgCard = window.gameSesh.card;
          }
          if (!window.gameSesh.end)
            continueGameModal();
          else
            loadGame();
        }
      },
      stats: {
        text: "Stats",
        btnClass: 'btn-blue',
        action: function () {
          statsModal();
        }
      },
      link: window.isDiscord ? undefined : {
        text: "Share",
        btnClass: 'btn-green',
        action: function (linkButton) {
          let d = new Date();
          let str =
            `Daily Befuddle ${d.toLocaleDateString("en-US")}\n${buildGuessString()}\n${buildDailyLivesString()}${(window.gameSesh.hideBlanks ? '*' : '')}`;
          clipboardHandler(linkButton, str, 'https://befuddle.xyz/');
          return false;
        }
      }
    }
  });
}

//handler for winning the game in free mode
function gameWinFree() {

  let wr = window.gameSesh.wrongGuess.length;

  if (!window.gameSesh.hideBlanks) {
    if (wr == 0)
      window.stats.free.perf[0]++;
    if (window.gameSesh.tlv != -1)
      window.stats.free.wr[0][window.gameSesh.tlv - 1][0]++;
    window.stats.free.score[0][wr]++;
  } else {
    if (wr == 0)
      window.stats.free.perf[1]++;
    if (window.gameSesh.tlv != -1)
      window.stats.free.wr[1][window.gameSesh.tlv - 1][0]++;
    window.stats.free.score[1][wr]++;
  }
  if (wr == 0) { //confetti if perfect game
    if (window.game.vibra && canVibrate)
      navigator.vibrate([400]);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6
      },
      zIndex: 900719925,
      colors: window.game.theme == 'dark' ? ['#eee'] : ['#333']
    });
  }
  setStorage('freeStats', JSON.stringify(window.stats.free)); //save free mode stats to local storage

  $.confirm({
    title: `<span class=\"modalText\">${getWinTerms(wr)}${(wr != 0 ? (` — ${wr} wrong`) : '')}</span>`,
    content: getCardHtml(),
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      tcg: {
        text: `${tcgSVG}`,
        btnClass: 'tcg-btn',
        action: function () {
          window.open(window.mtgCard.tcgLink, '_blank').focus();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function (linkButton) {
          let str = 'Befuddle: \n' + buildGuessString() + '\n' +
            wr + (window.gameSesh.tlv == -1 ? (' wrong guess' + (wr == 1 ? '' : 'es')) : ('/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '');
          const url = 'https://befuddle.xyz/?cardId=' + window.mtgCard.id + (window.mtgCard.cf != -1 ? ('&cf=' + window.mtgCard.cf) : '')
          clipboardHandler(linkButton, str, url);
          return false;
        }
      },
      close: {
        text: "Next Card",
        btnClass: 'btn-blue',
        keys: ['enter'],
        action: function () {
          if (window.cardList)
            requestCard();
          else
            loadGame();
        }
      }
    }
  });
}

//handler for the clipboard buttons
// centralised clipboard write + UI update
function _doClipboardWrite(linkButton, str, url) {
  const output = `${str}\n${url}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(output).then(function () {
      linkButton.addClass('displayButton');
      linkButton.setText('Copied');
      linkButton.addClass('btn-dark');
      linkButton.removeClass('btn-green');
      setTimeout(function (lb) {
        linkButton.removeClass('btn-dark');
        linkButton.addClass('btn-green');
      }, 100, linkButton);
      setTimeout(function (lb) {
        linkButton.setText('Share');
      }, 3000, linkButton);
    }, function () {
      clipboardError(output);
    });
  } else {
    clipboardError(output);
  }
}

function clipboardHandler(linkButton, str, url) {
  // Use native share when available (mobile browsers) and fall back to clipboard
  if (navigator.share) {
    navigator.share({
      title: 'Befuddle',
      text: `${str}\n`,
      url: url
    }).then(function () {
      linkButton.addClass('displayButton');
      linkButton.setText('Shared');
      linkButton.addClass('btn-dark');
      linkButton.removeClass('btn-green');
      setTimeout(function (lb) {
        linkButton.removeClass('btn-dark');
        linkButton.addClass('btn-green');
      }, 100, linkButton);
      setTimeout(function (lb) {
        linkButton.setText('Share');
      }, 3000, linkButton);
    }).catch(function () {
      // share failed or was cancelled — fall through to clipboard behaviour
      _doClipboardWrite(linkButton, str, url);
    });

    return;
  }

  // No native share available — use clipboard
  _doClipboardWrite(linkButton, str, url);
}

//function to display clipboard error
function clipboardError(str) {
  $.dialog({
    title: '<span class=\"modalTitle\">Error: Clipboard Access Denied</span>',
    content: '<span class=\"modalText\">You can manually copy the text below:<br><br><pre class=\"copyText\">' + str + '</pre></span>',
    type: 'red',
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    backgroundDismiss: true
  });
}

//helper to get card html display for modals
function getCardHtml() {
  let html;
  if (window.mtgCard['layout'] == 'transform' || window.mtgCard['layout'] == 'modal_dfc') {
    let imgSrc0 = window.mtgCard['card_faces'][window.mtgCard.cf]['image_uris']['normal'];
    let imgSrc1 = window.mtgCard['card_faces'][1 - window.mtgCard.cf]['image_uris']['normal'];
    if (window.isDiscord) {
      imgSrc0 = getDiscordProxiedUrl(imgSrc0);
      imgSrc1 = getDiscordProxiedUrl(imgSrc1);
    }
    html = '<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front">' +
      '<img src=\"' + imgSrc0 + '\" style=\"border-radius:8% / 6%;\"><span class="material-symbols-outlined flip-symbol-front"> chevron_right </span></div> <div class="flip-card-back">' +
      '<img src=\"' + imgSrc1 + '\" style=\"border-radius:8% / 6%;\"><span class="material-symbols-outlined flip-symbol-back"> chevron_left </span></div></div></div>';
  } else {
    let imgSrc = window.mtgCard.image_uris.normal;
    if (window.isDiscord) {
      imgSrc = getDiscordProxiedUrl(imgSrc);
    }
    html = "<img src=\"" + imgSrc + "\" style=\"border-radius:8% / 6%;\">";
  }
  return html;
}

//function to get the terms for wrong guesses
function getWinTerms(ind) {
  let terms = ['Compleat Perfection!', 'Ancestrally Recalled', 'Thought Twice', 'Pondered Well', 'Delved into Secrets', 'Pieces Pored Over', 'Faithlessly Looted', 'Tome Scoured', 'Dashed Hopes', 'Thoughts Siezed',
    'Mind Ground', 'Wildly Guessed', 'Yawgmoth\'s Wouldn\'t', 'Triskaidekaphobia!', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank',
    'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank'
  ];
  if (window.lives == 1)
    return 'Final Fortune';
  return terms[ind];
}

//function to hide the name of the card
function hideName(str, c) {

  let r = '',
    ch;
  for (var i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (isAlpha(ch) || window.accentedChars.has(ch))
      r += c;
    else
      r += ch;
  }
  return r;
}

//function to handle the help button
function helpModal() {
  if (window.game.mode == 'daily') {
    $.dialog({
      title: '<span class=\"modalTitle\">How to Play</span>',
      content: '<span class=\"helpText\">Guess the <a href="https://magic.wizards.com/en" target="_blank">Magic: The Gathering</a> Card from the art and mana cost, Hangman style. You have 7 lives, meaning after guessing 7 wrong letters, the game is over.<br><br>' +
        'After each guess, the keys will show you if the letter was incorrect, as well as the number of lives you have left.<br><br></span><div class="hr"></div>' +
        '<span class=\"helpText\">A new Befuddle will be available each day!</span>',
      theme: window.game.theme,
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false
    });
  } else if (window.game.mode == 'free') {
    $.dialog({
      title: '<span class=\"modalTitle\">How to Play</span>',
      content: '<span class=\"helpText\">Guess the <a href="https://magic.wizards.com/en" target="_blank">Magic: The Gathering</a> Card, Hangman style. Each card is randomly picked from a list of 30,000+ cards. You can adjust the number of lives and the mana cost display in the options menu.<br><br>' +
        'After each guess, the keyboard keys will show you if the letter was incorrect, as well as the number of lives you have left.<br><br></span><div class="hr"></div>' +
        '<span class=\"helpText\">This is Free Play mode, play to your heart\'s content!',
      theme: window.game.theme,
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false
    });
  }
}

//function to handle the settings button
function settingsModal() {

  let gameSettingsHtml = '';
  if (window.game.mode == 'daily') {

    gameSettingsHtml += '<div class="gameSettings">' +
      '<div class="gameSettings"><br><br><span class="menuText" id="themedisplay">Dark Mode</span>' +
      '<label class="switch"><input id="darkInput" type="checkbox" ' + (window.game.theme === 'dark' ? 'checked' : '') + '><div><span></span></div></label>' +
      (canVibrate ? (
        '<div class="gameSettings"><br><br><span class="menuText">Vibration</span>' +
        '<label class="switch"><input id="vibraInput" type="checkbox" ' + (window.game.vibra ? 'checked' : '') + '><div><span></span></div></label>'
      ) : '') +
      '<br><div class="hr"></div>' +
      '<br><span class="menuText" id="hmdisplay">Hidden mode</span>' +
      '<label class="switch"><input id="hmInput" type="checkbox" ' + (window.game.daily.hideBlanks ? 'checked' : '') + '><div><span></span></div></label>' +
      '<span class="smallText">Hidden mode hides the letter blanks.</span>' +
      '<br><br><div class="hr"></div><span class="smallText">Changes won\'t apply until the next game you play.</span><br>' +
      '</div>';

    window.setModal = $.dialog({
      title: '<span class=\"modalTitle\">Options</span>',
      content: gameSettingsHtml,
      theme: window.game.theme,
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false,
      onContentReady: function () {
        let hi = this.$content.find('#hmInput');
        hi.on('input', function () {
          window.game.daily.hideBlanks = this.checked;
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });

        let di = this.$content.find('#darkInput');
        di.on('input', function () {
          window.game.theme = (this.checked ? 'dark' : 'light');
          setTheme();
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });

        if (canVibrate) {
          let vi = this.$content.find('#vibraInput');
          vi.on('input', function () {
            window.game.vibra = this.checked;
            setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
          });
        }
      }
    });
  } else if (window.game.mode == 'free') {

    let manastates = ['Show Nothing', 'Show Colors', 'Show Mana Cost'];

    gameSettingsHtml += '<div class="gameSettings">' +
      '<div class="gameSettings"><br><br><span class="menuText" id="themedisplay">Dark Mode</span>' +
      '<label class="switch"><input id="darkInput" type="checkbox" ' + (window.game.theme === 'dark' ? 'checked' : '') + '><div><span></span></div></label>' +
      (canVibrate ? (
        '<div class="gameSettings"><br><br><span class="menuText">Vibration</span>' +
        '<label class="switch"><input id="vibraInput" type="checkbox" ' + (window.game.vibra ? 'checked' : '') + '><div><span></span></div></label>'
      ) : '') +
      '<br><div class="hr"></div>' +
      '<br><span class="menuText">Lives: <span id="livesdisplay">' + (window.game.free.lives == -1 ? 'Off' : window.game.free.lives) + '</span></span>' +
      '<div class="slidecontainer"><input id="livesInput" type="range" min="0" max="25" value="' + window.game.free.lives + '" class="slider"></div>' +
      '<br><span class="menuText" id="manadisplay">' + manastates[window.game.free.manaState] + '</span>' +
      '<div class="slidecontainer"><input id="manaInput" type="range" min="0" max="2" value="' + window.game.free.manaState + '" class="slider"></div>' +
      '<br><span class="menuText" id="hidedisplay">Hidden Mode</span>' +
      '<label class="switch"><input id="hideInput" type="checkbox" ' + (window.game.free.hideBlanks ? 'checked' : '') + '><div><span></span></div></label>' +
      '<span class="smallText">Hidden mode hides the letter blanks.</span>' +
      '<br><br><div class="hr"></div><span class="smallText">Game changes won\'t be adjusted until next card.</span><br>' +
      '</div>';
    window.setModal = $.dialog({
      title: '<span class=\"modalTitle\">Options</span>',
      content: gameSettingsHtml,
      theme: window.game.theme,
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false,
      onContentReady: function () {
        let lv = this.$content.find('#livesInput');
        lv.on('input', function () {
          if (this.value > 0) {
            document.getElementById('livesdisplay').innerText = this.value;
            window.game.free.lives = parseInt(this.value);
          } else if (this.value == 0) {
            document.getElementById('livesdisplay').innerText = 'Off';
            window.game.free.lives = -1;
          }
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });

        let mi = this.$content.find('#manaInput');
        mi.on('input', function () {
          let manastates = ['Show Nothing', 'Show Colors', 'Show Mana Cost'];
          window.game.free.manaState = parseInt(this.value);
          document.getElementById('manadisplay').innerText = manastates[parseInt(this.value)];
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });

        let hi = this.$content.find('#hideInput');
        hi.on('input', function () {
          window.game.free.hideBlanks = this.checked;
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });

        let di = this.$content.find('#darkInput');
        di.on('input', function () {
          window.game.theme = (this.checked ? 'dark' : 'light');
          setTheme();
          setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
        });
        if (canVibrate) {
          let vi = this.$content.find('#vibraInput');
          vi.on('input', function () {
            window.game.vibra = this.checked;
            setStorage('befuddle', JSON.stringify(window.game)); //save game settings data to local storage
          });
        }
      }
    });
  }
}

//function to handle status button
function statsModal() {

  let html = '';
  if (window.game.mode == 'daily') {
    html += '<div id="streakTitle">Streak</div>' +
      '<div><table id="streakTable"><tbody><tr><th>Current</th><th>Max</th></tr><tr><td>' +
      window.stats.daily.streak + '</td><td>' +
      window.stats.daily.maxStk + '</td></tr></tbody></table></div>' +
      '<canvas id="wrChart" class="chartCanvas" width="400px" height="300px"></canvas>' +
      '<canvas id="scoreChart" class="chartCanvas" width="400px" height="300px"></canvas>' +
      '<canvas id="accChart" class="chartCanvas" width="400px" height="300px"></canvas>';
  } else if (window.game.mode == 'free') {

    html += '<div id="streakTitle">Perfect Games</div>' +
      '<div><table id="streakTable"><tbody><tr><th>Normal Mode</th><th>Hidden Mode</th></tr><tr><td>' +
      window.stats.free.perf[0] + '</td><td>' +
      window.stats.free.perf[1] + '</td></tr></tbody></table></div>' +
      (wrvl() ? '<canvas id="wrChart" class="chartCanvas" width="400px" height="300px"></canvas>' : '') +
      '<canvas id="scoreChart" class="chartCanvas" width="400px" height="300px"></canvas>' +
      '<canvas id="accChart" class="chartCanvas" width="400px" height="300px"></canvas>';
  }

  $.dialog({
    title: '<span class=\"modalTitle\">Statistics</span>',
    content: html,
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function () {
      if (window.game.mode == 'daily') {
        dailyChartsSetup();
      } else if (window.game.mode == 'free') {
        freeChartsSetup();
      }
    }
  });
}

//small helper to determine if win rate vs lives in free mode is worth displaying
function wrvl() {
  for (var i = 0; i < 25; i++) {
    if (window.stats.free.wr[0][i][0] + window.stats.free.wr[0][i][1] +
      window.stats.free.wr[1][i][0] + window.stats.free.wr[1][i][1] != 0) {
      return true;
    }
  }
  return false;
}

//function to setup the charts for free mode stats
function freeChartsSetup() {
  let wr = [
    [],
    []
  ],
    w, l, la = [],
    la2 = [];
  for (var i = 0; i < 25; i++) {
    for (var k = 0; k < 2; k++) {
      w = window.stats.free.wr[k][i][0];
      l = window.stats.free.wr[k][i][1];
      if (w == l)
        wr[k].push(.5);
      else {
        wr[k].push(w / (w + l));
      }
    } //end k loop
    la.push(i);
    la2.push(i + 1);
  } //end i loop

  if (wrvl()) { //check if wrvl is worth displaying
    lineChart(document.getElementById('wrChart'), {
      labels: la2,
      datasets: [{
        label: 'Normal',
        data: wr[0],
        backgroundColor: '#346888',
        borderColor: '#346888'
      }, {
        label: 'Hidden',
        data: wr[1],
        backgroundColor: '#9dc6e0',
        borderColor: '#9dc6e0'
      }]
    }, 'Win Rate vs Lives')
  }


  //vertical bar chart setup
  vertBarChart(document.getElementById('scoreChart').getContext('2d'), {
    labels: la,
    datasets: [{
      label: 'Normal',
      data: window.stats.free.score[0],
      backgroundColor: '#346888',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      stack: 'Stack 0'
    }, {
      label: 'Hidden',
      data: window.stats.free.score[1],
      backgroundColor: '#9dc6e0',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      stack: 'Stack 0'
    }]
  }, 'Score Distribution');

  //pi chart setup
  mspie(document.getElementById('accChart').getContext('2d'), {
    labels: ['Correct (Normal)', 'Incorrect (Normal)', 'Correct (Hidden)', 'Incorrect (Hidden)'],
    datasets: [{
      backgroundColor: ['#346888', '#a35347'],
      data: [window.stats.free.acc[0], window.stats.free.acc[1]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }, {
      backgroundColor: ['#9dc6e0', '#edbcb0'],
      data: [window.stats.free.acc[2], window.stats.free.acc[3]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }]
  }, 'Letter Accuracy');
}

//function to setup the charts for daily mode stats
function dailyChartsSetup() {
  mspie(document.getElementById('wrChart').getContext('2d'), {
    labels: ['Win (Normal)', 'Loss (Normal)', 'Win (Hidden)', 'Loss (Hidden)'],
    datasets: [{
      backgroundColor: ['#346888', '#a35347'],
      data: [window.stats.daily.WL[0], window.stats.daily.WL[1]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }, {
      backgroundColor: ['#9dc6e0', '#edbcb0'],
      data: [window.stats.daily.WL[2], window.stats.daily.WL[3]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }]
  }, 'Daily Win/Loss');
  vertBarChart(document.getElementById('scoreChart').getContext('2d'), {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [{
      label: 'Normal',
      data: window.stats.daily.score[0],
      backgroundColor: '#346888',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      stack: 'Stack 0'
    }, {
      label: 'Hidden',
      data: window.stats.daily.score[1],
      backgroundColor: '#9dc6e0',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 1,
      stack: 'Stack 0'
    }]
  }, 'Score Distribution');
  mspie(document.getElementById('accChart').getContext('2d'), {
    labels: ['Correct (Normal)', 'Incorrect (Normal)', 'Correct (Hidden)', 'Incorrect (Hidden)'],
    datasets: [{
      backgroundColor: ['#346888', '#a35347'],
      data: [window.stats.daily.acc[0], window.stats.daily.acc[1]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }, {
      backgroundColor: ['#9dc6e0', '#edbcb0'],
      data: [window.stats.daily.acc[2], window.stats.daily.acc[3]],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2
    }]
  }, 'Letter Accuracy');
}

//function to handle menu button
function menuModal() {

  function giveupConfirm() {
    $.confirm({
      title: '<span class=\"modalTitle\">Show Answer</span>',
      content: '<span class=\"helpText\">Are you sure you want to abandon this Befuddle?</span>',
      theme: 'dark red',
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(300px, 60%)',
      draggable: false,
      backgroundDismiss: false,
      useBootstrap: false,
      buttons: {
        show: {
          text: 'Show Answer',
          btnClass: 'btn-red',
          action: function () {
            window.gameSesh.end = true;
            document.getElementById('seeCard').style = '';
            if (window.game.mode == 'daily') {
              window.gameSesh.giveUp = true;
              if (!window.gameSesh.submitted) {
                window.gameSesh.submitted = true;
                submitDailyData('x');
              }
              gameLostDaily();
            } else if (window.game.mode == 'free')
              gameLostFree();

            setStorage(window.game.mode, JSON.stringify(window.gameSesh)); //save game session data to local storage
            menuD.close();
          }
        },
        cancel: {
          text: 'Cancel',
          btnClass: 'btn-default'
        }
      }
    });
  }

  function clearConfirm() {
    $.confirm({
      title: '<span class=\"modalTitle\">Clear Data</span>',
      content: '<span class=\"helpText\">This will clear all cookies, delete all statistics and all unfinished Befuddles. Are you sure?</span>',
      theme: 'dark red',
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(300px, 60%)',
      draggable: false,
      backgroundDismiss: false,
      useBootstrap: false,
      buttons: {
        show: {
          text: 'Clear Data',
          btnClass: 'btn-red',
          action: function () {
            Cookies.remove('befuddle');
            Cookies.remove('daily');
            Cookies.remove('free');
            Cookies.remove('dailyStats');
            Cookies.remove('freeStats');
          }
        },
        cancel: {
          text: 'Cancel',
          btnClass: 'btn-default'
        }
      }
    });
  }

  let menuD = $.dialog({
    title: '',
    content: '<div class="modalTitle" style="text-align: center;font-size: 30px;">Befuddle</div>' +
      '<br><button id="returnButton" class="menuButton">Select Game Mode</button>' +
      (window.gameSesh.end ? '' : '<br><button id="guButton" class="menuButton">Show Answer</button>') +
      '<br><button id="clearButton" class="menuButton">Clear Data</button>' +
      '<br><br><div class="hr"></div>' +
      '<div class="modalText" id="credits">Credits <span id="creditExpand" class="material-symbols-outlined"> expand_more </span></div>' +
      '<div id="creditText"class="expandiv collapsediv">• Card Data: <a href="https://scryfall.com/" target="_blank">Scryfall</a>' +
      '<br>• Card Images: <a href="https://scryfall.com/" target="_blank">Scryfall</a>' +
      '<br>• Font: <a href="https://company.wizards.com/en" target="_blank">Wizards of the Coast</a><br><br></div>' +
      '<div class="hr"></div><div class=\"modalText\" id="disclaimer">Disclaimer  <span id="disclaimerExpand" class="material-symbols-outlined"> expand_more </span></div>' +
      '<div id="disclaimerText" class="expandiv collapsediv">Portions of Befuddle are unofficial Fan Content permitted under the <a href="https://company.wizards.com/en/legal/fancontentpolicy" target="_blank">Wizards of the Coast Fan Content Policy</a>. ' +
      'The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. Befuddle is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.<br><br></div>' +
      '<div class="hr"></div>' +
      '<div class="helpText" style="text-align: center;line-height:1.8;">Developed with <span id="easterEggHeart" class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;"> favorite </span> by Suitangi' +
      '<br><a><span id="rab">Report a Bug</span></a>' +
      '<br><a href="https://twitter.com/BefuddleMTG" target="_blank"><span>Twitter</span></a>' +
      '<br><a><span id="bmad">Buy me a Drink</span></a></div>',
    theme: window.game.theme,
    animation: 'left',
    closeAnimation: 'left',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function () {
      document.getElementById('credits').addEventListener('click', function () {
        let s = document.getElementById('creditText');
        if (!s.classList.contains('collapsediv')) {
          s.classList.add('collapsediv');
          document.getElementById('creditExpand').classList.remove('rotato');
        } else {
          s.classList.remove('collapsediv');
          document.getElementById('creditExpand').classList.add('rotato');
        }
      });
      document.getElementById('disclaimer').addEventListener('click', function () {
        let s = document.getElementById('disclaimerText');
        if (!s.classList.contains('collapsediv')) {
          s.classList.add('collapsediv');
          document.getElementById('disclaimerExpand').classList.remove('rotato');
        } else {
          s.classList.remove('collapsediv');
          document.getElementById('disclaimerExpand').classList.add('rotato');
        }
      });
      document.getElementById('clearButton').addEventListener('click', function () {
        clearConfirm();
      });
      document.getElementById('returnButton').addEventListener('click', function () {
        window.gameSesh.end = true;
        menuD.close();
        mainMenuDisplay();
      });
      document.getElementById('rab').addEventListener('click', function () {
        menuD.close();
        reportBug();
      });
      document.getElementById('bmad').addEventListener('click', function () {
        buyDrink();
      });
      document.getElementById('easterEggHeart').addEventListener('click', function () {
        easterEgg();
      });
      if (!window.gameSesh.end) {
        document.getElementById('guButton').addEventListener('click', function () {
          giveupConfirm();
        });
      }
    }
  });
}

//function to get browser info
function getBrowserInfo() {
  let nVer = navigator.appVersion;
  let nAgt = navigator.userAgent;
  let browserName = navigator.appName;
  let fullVersion = '' + parseFloat(navigator.appVersion);
  let majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset, verOffset, ix;
  let osName = "Unknown OS";

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) != -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) != -1)
    fullVersion = fullVersion.substring(0, ix);

  majorVersion = parseInt('' + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  if (navigator.appVersion.indexOf("Win") != -1) osName = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) osName = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) osName = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) osName = "Linux";

  let result = {
    'Browser name': browserName,
    'Full version': fullVersion,
    'Major version': majorVersion,
    'navigator.appName': navigator.appName,
    'navigator.userAgent': navigator.userAgent,
    'OS': osName,
    'Befuddle Version': befuddleAppVersion
  }
  return result;
}

//functino for easter egg
function easterEgg() {
  $.dialog({
    title: '<div class="modalTitle" style="text-align: center;">Easter Egg!</div>',
    content: `<div id="easteggDiv">Special thanks to my Beta testers pkmnfn and killersax!<br><br>Version ${befuddleAppVersion}</div>`,
    theme: window.game.theme,
    animation: 'bottom',
    closeAnimation: 'bottom',
    animateFromElement: false,
    boxWidth: 'min(350px, 75%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function () { }
  });
}

//function to report bug
function reportBug() {

  let mainHtml, formHtml;
  let formUri = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfofhsXMv1iW188eXql2h5KwPr08dE4j93EwA3-hd9lNxr5OA/formResponse';
  if (window.isDiscord) {
    formUri = getDiscordProxiedUrl(formUri);
  }
  mainHtml = '<div class="modalTitle" style="text-align: center;">Report a Bug</div><br>' +
    '<div id="mainBug"><button id="gameBugButton" class="rabButton">Gameplay Bug</button>' +
    '<button id="artBugButton" class="rabButton">Art Issue</button>' +
    '<button id="fBugButton" class="rabButton">Other Feedback</button></div>' +
    '<div id="artBug" style="display:none;"><button id="artGoneButt" class="rabButton">The art is not displaying correctly</button>' +
    '<button id="artCardButt" class="rabButton">The art corresponds to the wrong card name</button>' +
    '<button id="artCropButt" class="rabButton">The art is incorrectly cropped</button>' +
    '<button id="artOtherButt" class="rabButton">Other art Issues</button></div>' +
    '<div id="textBug" style="display:none;"><textarea id="bugTextArea" placeholder=""></textArea><button id="bugSubmitButt" class="rabButton" style="display:none;">Submit</button></div>' +
    '<div id="tyBug" style="display:none;"><div id="tyBugText">Thank you for making Befuddle better!</div><br><button id="bugCloseButt" class="rabButton">Close</button></div>';

  formHtml = '<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>' +
    `<form id="bugForm" action="${formUri}" target="dummyframe" method="post">` +
    '<input type="hidden" id="bTypeInput" value="" name="entry.298329572">' + //bug type
    '<input type="hidden" id="bTextInput" value="" name="entry.1100833739">' + //bug text
    '<input type="hidden" id="biInput" value="" name="entry.1735799869">' + //browser info
    '<input type="hidden" id="cgInput" value="" name="entry.619731512">' + //current game
    '<input type="hidden" id="gsInput" value="" name="entry.176552618">' + //game settings
    '<input type="hidden" id="dailyInput" value="" name="entry.1801614587">' + //daily saved
    '<input type="hidden" id="freeInput" value="" name="entry.1780387024">' + //free saved
    '</form>';

  window.reportingBug = true;

  let rabDialog = $.dialog({
    title: '',
    content: mainHtml + formHtml,
    theme: window.game.theme,
    animation: 'bottom',
    closeAnimation: 'bottom',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: false,
    useBootstrap: false,
    onContentReady: function () {
      document.getElementById('biInput').value = JSON.stringify(getBrowserInfo());
      document.getElementById('cgInput').value = JSON.stringify(window.gameSesh);
      document.getElementById('gsInput').value = getStorage('befuddle');
      document.getElementById('dailyInput').value = getStorage('daily');
      document.getElementById('freeInput').value = getStorage('free');

      document.getElementById('gameBugButton').addEventListener('click', function () {
        document.getElementById('bTypeInput').value = "Gameplay";
        document.getElementById('mainBug').style = "display:none;";
        document.getElementById('bugTextArea').placeholder = "What gameplay bug did you encounter? Try to be specific, and if possible, include steps to recreate the bug.";
        document.getElementById('textBug').style = "";
      });
      document.getElementById('artBugButton').addEventListener('click', function () {
        document.getElementById('bTypeInput').value = "Art";
        document.getElementById('mainBug').style = "display:none;";
        document.getElementById('artBug').style = "";
      });
      document.getElementById('fBugButton').addEventListener('click', function () {
        document.getElementById('bTypeInput').value = "Feedback";
        document.getElementById('mainBug').style = "display:none;";
        document.getElementById('bugTextArea').placeholder = "All feedback and comments are welcome!";
        document.getElementById('textBug').style = "";
      });
      document.getElementById('artCardButt').addEventListener('click', function () {
        document.getElementById('bTextInput').value = 'Art: Wrong card';
        document.getElementById('artBug').style = "display:none;";
        document.getElementById('bugForm').submit();
        document.getElementById('tyBug').style = "";
      });
      document.getElementById('artCropButt').addEventListener('click', function () {
        document.getElementById('bTextInput').value = 'Art: Crop';
        document.getElementById('artBug').style = "display:none;";
        document.getElementById('bugForm').submit();
        document.getElementById('tyBug').style = "";
      });
      document.getElementById('artGoneButt').addEventListener('click', function () {
        document.getElementById('bTextInput').value = 'Art: Missing';
        document.getElementById('artBug').style = "display:none;";
        document.getElementById('bugForm').submit();
        document.getElementById('tyBug').style = "";
      });
      document.getElementById('artOtherButt').addEventListener('click', function () {
        document.getElementById('artBug').style = "display:none;";
        document.getElementById('bugTextArea').placeholder = "What other art issues did you encounter?";
        document.getElementById('textBug').style = "";
      });

      document.getElementById('bugTextArea').addEventListener('input', function () {
        if (this.value != '')
          document.getElementById('bugSubmitButt').style = "";
        else
          document.getElementById('bugSubmitButt').style = "display:none;";
        document.getElementById('bTextInput').value = this.value;
      });

      document.getElementById('bugSubmitButt').addEventListener('click', function () {
        document.getElementById('textBug').style = "display:none;";
        document.getElementById('bugForm').submit();
        document.getElementById('tyBug').style = "";
      });

      document.getElementById('bugCloseButt').addEventListener('click', function () {
        document.getElementById('dummyframe').remove();
        rabDialog.close();
      });


    },
    onClose: function () {
      window.reportingBug = false;
    }
  });
}

//function to buy drink
function buyDrink() {
  if (isDiscord) {
    try {
      discordSdk.commands.openExternalLink({ url: 'https://ko-fi.com/suitangi' });
    } catch (error) {
      console.error("Could not open link in Discord:", error);
    }
    return;
  }

  let src = "https://ko-fi.com/suitangi/?hidefeed=true&amp;widget=true&amp;embed=true&amp;preview=true";
  if (window.isDiscord) {
    src = getDiscordProxiedUrl(src);
  }
  $.dialog({
    title: ' ',
    content: `<iframe id="kofiframe" src="${src}" style="border:none;padding:4px;" height="712" title="suitangi"></iframe>`,
    theme: 'light',
    animation: 'bottom',
    closeAnimation: 'bottom',
    animateFromElement: false,
    boxWidth: 'min(320px, 85%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function () { }
  });
}

//function for the continue game? modal
function continueGameModal() {
  $.confirm({
    title: '<span class=\"modalTitle\">Continue?</span>',
    content: '<span class=\"modalText\">Previous game data found, would you like to continue?</span>',
    theme: window.game.theme,
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: false,
    useBootstrap: false,
    buttons: {
      free: {
        text: 'New Game',
        btnClass: 'btn-purple',
        action: function () {
          window.gameSesh.end = true;
          Cookies.remove('free');
          loadGame();
        }
      },
      daily: {
        text: 'Continue',
        btnClass: 'btn-blue',
        action: function () {
          loadGame();
        }
      }
    }
  });
}

//function to display initial main menu
function mainMenuDisplay() {
  mainMenuModal = $.confirm({
    title: '<span id=\"mainMenuTitle\">Welcome to Befuddle</span>',
    content: '<span class=\"mainMenuText\">Select your game mode</span>',
    theme: 'supervan',
    animation: 'opacity',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: false,
    backgroundDismissAnimation: 'none',
    useBootstrap: false,
    onContentReady: function () {
      this.buttons.daily.el.hover(function () {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Challenge the daily Befuddle</span>');
      }, function () {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Select your game mode</span>');
      });

      this.buttons.free.el.hover(function () {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Play endlessly on free mode</span>');
      }, function () {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Select your game mode</span>');
      });
    },
    buttons: {
      daily: {
        text: '<span class=\"mainMenuText\">Daily Befuddle</span>',
        action: function () {
          startDaily();
        }
      },
      free: {
        text: '<span class=\"mainMenuText\">Free Play</span>',
        action: function () {
          window.game.mode = 'free';
          if (getStorage('free')) {
            window.gameSesh = JSON.parse(getStorage('free'));
            window.mtgCard = window.gameSesh.card;
          }
          if (!window.gameSesh.end)
            continueGameModal();
          else
            loadGame();
        }
      }
    }
  });
}

//function to start the daily game
function startDaily() {
  window.game.mode = 'daily';
  if (getStorage('daily')) {
    window.gameSesh = JSON.parse(getStorage('daily'));
    window.mtgCard = window.gameSesh.card;
    window.gameSesh.end = false; //seems counterintuitive, but is for reshowing the daily result
  }
  loadGame();
}

//function to load the game
function loadGame() {

  if (window.game.mode == undefined) {
    mainManuDisplay();
    return;
  }

  //continue last game session
  if (!window.gameSesh.end) {
    console.log('Continued Game Session');
    loadCard();
    loadGuesses();

    //person gaveup, show losing screen
    if (window.game.mode == 'daily' && window.gameSesh.giveUp) {
      window.gameSesh.end = true;
      document.getElementById('seeCard').style = '';
      gameLostDaily();
      setStorage('daily', JSON.stringify(window.gameSesh)); //save daily game session data to local storage
    }
    return; //don't load a new game
  } else {

    //pull up tutorial
    if (window.firstTime) {
      helpModal();
    }
  }

  //Fetch different things based on different mode
  if (window.game.mode == 'daily') {

    function dailyCard(data) {
      document.getElementById("cardImage").style = "opacity:0; transition: opacity 0s;";
      document.getElementById("imageLoading").style = "";
      let d = new Date();
      // window.game.daily.timestamp = d.getTime();
      setStorage('befuddle', JSON.stringify(window.game), {
        expires: 365
      });
      if (getDateNumber() - data.start >= data.list.length) {
        console.error('Daily Befuddle needs to be updated, please report a bug to Suitangi');
        $.dialog({
          title: '<span class=\"modalTitle\">Error</span>',
          content: '<span class=\"modalText\">Daily Befuddle needs to be updated, please contact us on <a href="https://x.com/BefuddleMTG" target="_blank">Twitter</a> or on Discord!</span>',
          type: 'red',
          theme: window.game.theme,
          animation: 'top',
          closeAnimation: 'top',
          animateFromElement: false,
          boxWidth: 'min(400px, 80%)',
          draggable: false,
          useBootstrap: false,
          typeAnimated: true,
          backgroundDismiss: true
        });
      }
      console.log(`Needs update in ${data.start + data.list.length - getDateNumber()} days.`)
      loadCard(data.list[getDateNumber() - data.start]);
    }

    if (window.dailyList == null) { //fetch first if null
      fetch('./dailyList.json')
        .then(response => response.json())
        .then(data => {
          window.dailyList = data;
          dailyCard(data);
        })
        .catch(function (e) {
          console.log(e);
          console.error('Could not fetch daily card list');
        });
    } else { //no need to re-fetch
      dailyCard(window.dailyList);
    }
  } else if (window.game.mode == 'free') {

    function freeCard(data) {
      if (getParameterByName('cardId'))
        requestCard(getParameterByName('cardId'));
      else
        requestCard();
    }

    if (window.cardList == null) { //fetch card list then request
      fetch('./cardList.json')
        .then(response => response.json())
        .then(data => {
          window.cardList = data;
          freeCard(data);
        })
        .catch(function () {
          console.error('Could not fetch card list');
        });
    } else { //no need to re-fetch
      freeCard(window.cardList);
    }
  }
}

//function to load the timer
function loadTimer() {

  const SYNCSECONDS = 120; //every 2 minutes
  let now = new Date();
  let midnight = new Date;
  midnight.setHours(24, 0, 0, 0);
  let seconds = (now.getMinutes() * 60 + now.getSeconds()) % SYNCSECONDS;
  let timeTo = midnight - now;
  let str, h, m, s;

  function msToTime(s) {

    function pad(n) {
      return ('0' + n).slice(-2);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }

  window.timeTick = function timerTick() {
    clearTimeout(window.dailyTimer);
    if (seconds == SYNCSECONDS) { //Sync time again
      now = new Date();
      seconds = (now.getMinutes() * 60 + now.getSeconds()) % SYNCSECONDS;
      if (now >= midnight) { //midnight, load new daily game
        if (window.game.mode == 'daily') {
          if (window.dailyModal !== null && window.dailyModal.isOpen()) {
            window.dailyModal.close();
            window.dailyModal = null;
          }
          Cookies.remove('daily');
          window.gameSesh.end = true;
          loadGame();
        } else {
          Cookies.remove('daily');
        }
        loadTimer();
        return;
      }
      timeTo = midnight - now;
      window.dailyTimer = setTimeout(function (t) {
        timeTo -= t;
        window.timeTick();
      }, 1000 - now.getMilliseconds(), 1000 - now.getMilliseconds());
    } else {
      window.dailyTimer = setTimeout(function () {
        timeTo -= 1000;
        window.timeTick();
      }, 1000);
    }
    if (window.dailyModal !== null && window.dailyModal.isOpen()) {
      document.getElementById('dailyTimerDisplay').innerText = 'Next Daily Befuddle │ ' + msToTime(timeTo);
    }
    seconds++;
  }

  window.dailyTimer = setTimeout(function () {
    window.timeTick();
  }, 1000 - now.getMilliseconds());
}

//charting function for multi-series pie chart
function mspie(ctx, data, title) {
  return new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            generateLabels: function (chart) {
              // Get the default label list
              const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const labelsOriginal = original.call(this, chart);

              // Build an array of colors used in the datasets of the chart
              let datasetColors = chart.data.datasets.map(function (e) {
                return e.backgroundColor;
              });
              datasetColors = datasetColors.flat();

              // Modify the color and hide state of each label
              labelsOriginal.forEach(label => {
                // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                label.datasetIndex = (label.index - label.index % 2) / 2;

                // The hidden state must match the dataset's hidden state
                label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                // Change the color to match the dataset
                label.fillStyle = datasetColors[label.index];
              });

              return labelsOriginal;
            },
            color: window.game.theme == 'dark' ? 'white' : 'black',
            font: {
              family: 'Roboto Mono'
            },
          },
          onClick: function (mouseEvent, legendItem, legend) {
            // toggle the visibility of the dataset from what it currently is
            legend.chart.getDatasetMeta(
              legendItem.datasetIndex
            ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
            legend.chart.update();
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
              return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
            }
          },
          titleFont: {
            family: 'Roboto Mono'
          },
          bodyFont: {
            family: 'Roboto Mono'
          }
        },
        title: {
          display: true,
          color: window.game.theme == 'dark' ? 'white' : 'black',
          font: {
            family: 'Beleren Bold',
            size: 20
          },
          text: title
        }
      }
    }
  });
}

//charting function for vertical bar chart
function vertBarChart(ctx, data, title) {
  return new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: window.game.theme == 'dark' ? 'white' : 'black',
            stepSize: 1
          },
          grid: {
            borderColor: window.game.theme == 'dark' ? 'white' : 'black',
            color: '#6D6D6D'
          },
          title: {
            font: {
              family: 'Beleren Bold'
            }
          },
          stacked: true
        },
        x: {
          ticks: {
            color: window.game.theme == 'dark' ? 'white' : 'black'
          },
          grid: {
            borderColor: window.game.theme == 'dark' ? 'white' : 'black',
            display: false
          },
          title: {
            font: {
              family: 'Beleren Bold'
            }
          },
          stacked: true
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: window.game.theme == 'dark' ? 'white' : 'black',
            font: {
              family: 'Roboto Mono'
            },
          }
        },
        title: {
          display: true,
          color: window.game.theme == 'dark' ? 'white' : 'black',
          font: {
            family: 'Beleren Bold',
            size: 20
          },
          text: title
        },
        tooltip: {
          titleFont: {
            family: 'Roboto Mono'
          },
          bodyFont: {
            family: 'Roboto Mono'
          }
        }
      }
    }
  });
}

//charting function for vertical line chart
function lineChart(ctx, data, title) {
  return new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          min: 0,
          max: 1,
          ticks: {
            color: window.game.theme == 'dark' ? 'white' : 'black',
            stepSize: 1
          },
          grid: {
            borderColor: window.game.theme == 'dark' ? 'white' : 'black',
            color: '#6D6D6D'
          },
          title: {
            font: {
              family: 'Beleren Bold'
            }
          }
        },
        x: {
          ticks: {
            color: window.game.theme == 'dark' ? 'white' : 'black'
          },
          grid: {
            borderColor: window.game.theme == 'dark' ? 'white' : 'black',
            display: false
          },
          title: {
            font: {
              family: 'Beleren Bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: window.game.theme == 'dark' ? 'white' : 'black',
            font: {
              family: 'Roboto Mono'
            },
          }
        },
        title: {
          display: true,
          color: window.game.theme == 'dark' ? 'white' : 'black',
          font: {
            family: 'Beleren Bold',
            size: 20
          },
          text: title
        },
        tooltip: {
          titleFont: {
            family: 'Roboto Mono'
          },
          bodyFont: {
            family: 'Roboto Mono'
          }
        }
      }
    }
  });
}

//sets the theme for the site
function setTheme() {
  let theme = window.game.theme;

  if (window.setModal) {
    window.setModal.$body.prevObject.removeClass('jconfirm-dark');
    window.setModal.setTheme(window.game.theme);
  }
  if (window.dailyModal) {
    window.dailyModal.$body.prevObject.removeClass('jconfirm-dark');
    window.dailyModal.setTheme(window.game.theme);
  }

  const root = document.querySelector(':root');
  root.setAttribute('color-scheme', `${theme}`);
}

//Checks if current window is in focus (for timing purposes)
function checkTabFocused() {
  if (document.visibilityState === 'visible') {
    window.timeTick();
  }
}

//Submits daily data
function submitDailyData(win) {
  let uri = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf8M4zoBjF6ZcY0v4ebBXmBCKr0vpB_EtAZLPE2-B0ZDfGBLg/formResponse";
  if (window.isDiscord) {
    uri = getDiscordProxiedUrl(uri);
  }
  const entryNames = ['entry.1034508364', 'entry.462826655', 'entry.2082961611'];
  const values = [window.gameSesh.doy, window.gameSesh.guesses, win];

  let tmpinput;
  let ddFrame = document.createElement('iframe');
  ddFrame.setAttribute('name', 'dummydailyframe');
  ddFrame.setAttribute('id', 'dummydailyframe');
  ddFrame.style = "display: none;";
  let form = document.createElement('form');
  form.setAttribute('id', 'dailyForm');
  form.setAttribute('action', uri);
  form.setAttribute('target', 'dummydailyframe');
  form.setAttribute('method', 'post');
  entryNames.forEach((en, i) => {
    tmpinput = document.createElement('input');
    tmpinput.setAttribute('type', 'hidden');
    tmpinput.setAttribute('value', values[i]);
    tmpinput.setAttribute('name', en);
    form.appendChild(tmpinput);
  });
  document.getElementById('dailyDataDummy').appendChild(ddFrame);
  document.getElementById('dailyDataDummy').appendChild(form);
  form.submit();
  console.log('Daily data submitted');
  setTimeout(() => {
    document.getElementById('dailyDataDummy').innerHTML = '';
  }, 2000);
}

function getDiscordProxiedUrl(originalUrl) {
  if (!originalUrl) return '';

  return originalUrl
    .replace("https://api.scryfall.com", "/scry-com/api")
    .replace("https://c2.scryfall.com", "/scry-com/c2")
    .replace("https://cards.scryfall.io", "/scry-io/cards")
    .replace("https://svgs.scryfall.io", "/scry-io/svgs")
    .replace("https://docs.google.com/forms", "/google/forms")
    .replace("https://ko-fi.com", "/kofi")
    .replace("https://storage.ko-fi.com", "/kofi-storage");
}

function isMobile() {
  let hasTouchScreen = false;

  // 1. Check for maxTouchPoints (MDN recommended primary method)
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) { // Fallback for older IE
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    // 2. Fallback to matchMedia for pointer accuracy
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) { // 3. Fallback to orientation check (deprecated, good fallback)
      hasTouchScreen = true;
    } else {
      // 4. Last resort: User Agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }
  return hasTouchScreen;
}

async function initializeDiscordApp() {
  console.log("Checking platform environment...");

  window.addEventListener('message', (event) => {
    if (event.data?.evt === 'READY') {
      console.log('--- RAW DISCORD HANDSHAKE ---');
      console.log(JSON.stringify(event.data.data, null, 2));
    }
  });

  // 2. Wait up to 2 seconds for the SDK module to attach to window
  let attempts = 0;
  while (!window.discordSdk && attempts < 20) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }

  // 3. Determine environment
  // We check for the SDK object AND a Discord-specific URL param as a backup
  const urlParams = new URLSearchParams(window.location.search);
  const hasDiscordParam = urlParams.has('frame_id') || urlParams.has('instance_id');

  if (window.discordSdk && hasDiscordParam) {
    console.log("Running inside Discord Activity");
    window.isDiscord = true;

    //convert symbol urls
    Object.keys(window.mtgSymbols).forEach(key => {
      window.mtgSymbols[key] = getDiscordProxiedUrl(window.mtgSymbols[key]);
    });

    if (isMobile()) {
      console.log("Mobile environment detected");
      document.getElementsByTagName('html')[0].style = "transform: translateY(50px); height: calc(100% - 50px);";
    }

    try {
      await discordSdk.ready();
      console.log("Discord Handshake Complete!");
      // Proceed with Discord-specific features (Auth, etc.)

      if (!localStorage.getItem('discordUser')) {
        console.log("No Discord user info found in localStorage, getting user info...");
        getDiscordUserInfo();
      } else {
        window.discordUser = JSON.parse(localStorage.getItem('discordUser'));
        console.log("Discord user info loaded from localStorage:", window.discordUser);
      }

    } catch (err) {
      console.error("Discord SDK failed to ready:", err);
    }
  } else {
    console.log("Running in Standard Web Browser");
    window.isDiscord = false;
  }

}

/**
 * This is to get the user's Discord info if they're playing in the Discord Activity
 */
async function getDiscordUserInfo() {
  console.log("Attempting to get Discord user info...");
  if (window.isDiscord) {
    try {
      const { code } = await window.discordSdk.commands.authorize({
        client_id: window.discordSdk.clientId,
        response_type: "code",
        scope: ["identify"],
        prompt: "none"
      });

      const response = await fetch('/api/token', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      const token = data.access_token;
      const auth = await window.discordSdk.commands.authenticate({
        access_token: token,
      });
      if (!auth.user || !auth.user.id || !auth.user.username) {
        throw new Error('Missing Discord user info');
      }
      console.log("User ID:", auth.user.id);
      console.log("Username:", auth.user.username);
      window.discordUser = auth.user;
      localStorage.setItem('discordUser', JSON.stringify(auth.user));
    } catch (err) {
      console.error("Discord User Authorization Failed:", err);
      $.dialog({
        title: '<span class="modalTitle">Error</span>',
        content: '<span class="modalText">Discord User Authorization Failed, some features may not work correctly.</span>',
        type: 'red',
        theme: window.game.theme,
        animation: 'top',
        closeAnimation: 'top',
        animateFromElement: false,
        boxWidth: 'min(400px, 80%)',
        draggable: false,
        useBootstrap: false,
        typeAnimated: true,
        backgroundDismiss: true,
        buttons: {
          retry: {
            text: 'Retry',
            btnClass: 'btn-blue',
            action: function () {
              getDiscordUserInfo();
            }
          },
          close: {
            text: 'Close',
            btnClass: 'btn-default'
          }
        }
      });
    }
  }
}

async function sendDiscordMessageUpdate() {
  if (window.isDiscord && !window.gameSesh.discordSent) {
    const response = await fetch('/share', {
      method: 'POST',
      body: JSON.stringify({
        channelId: window.discordSdk.channelId,
        userId: window.discordUser.id,
        hiddenMode: window.gameSesh.hideBlanks,
        cardArtUrl: window.mtgCard.image_uris ? window.mtgCard.image_uris.art_crop : (window.mtgCard.card_faces ? window.mtgCard.card_faces[0].image_uris.art_crop : ''),
        lives: window.game.mode == 'daily' ? window.game.daily.lives - window.gameSesh.wrongGuess.length : undefined,
        guessProgress: window.gameSesh.guessProgress
      })
    });
    window.gameSesh.discordSent = true;
    setStorage('daily', JSON.stringify(window.gameSesh));
  }
}

async function getDiscordLaunchConfig() {
  if (window.isDiscord) {
    const { channelId, userId } = window.discordSdk;
    const res = await fetch(`/api/config?channelId=${channelId}&userId=${userId}`);
    const intent = await res.json();

    if (intent.mode === 'daily') {
      return('daily');
    } else {
      console.log("Loading standard Befuddle...");
    }
  }
}

//start script
$(document).ready(function () {
  console.log('Befuddle version: ' + befuddleAppVersion);
  console.log('https://tinyurl.com/specialcardforbefuddle');

  window.displayKeyboard = {};
  window.loadingGuesses = false;
  window.dailyModal = null;
  window.reportingBug = false;
  window.cardQueue = [];

  window.game = {};
  window.game.theme = 'dark'; //dark mode default
  window.game.vibra = true;

  window.game.daily = {};
  window.game.daily.lives = 7;
  window.game.daily.hideBlanks = false;

  window.game.free = {};
  window.game.free.lives = -1;
  window.game.free.manaState = 2;
  window.game.free.hideBlanks = false;

  window.gameSesh = {};
  window.gameSesh.end = true;
  window.gameSesh.submitted = false;

  window.stats = {};
  window.stats.daily = {};
  window.stats.daily.streak = 0;
  window.stats.daily.maxStk = 0;
  window.stats.daily.score = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  window.stats.daily.WL = [0, 0, 0, 0];
  window.stats.daily.acc = [0, 0, 0, 0];
  window.stats.daily.doy = 0;

  window.stats.free = {};
  window.stats.free.perf = [0, 0];
  window.stats.free.acc = [0, 0, 0, 0];
  window.stats.free.wr = [
    [],
    []
  ];
  window.stats.free.score = [
    [],
    []
  ];

  window.accentMap = {
    'a': ['à', 'á'],
    'e': ['é'],
    'i': ['í', 'ï'],
    'o': ['ó', 'ö'],
    'u': ['ú', 'û', 'ü'],
    'n': ['ñ'],
    'E': ['É']
  }

  window.reverseAccentMap = {};

  Object.keys(window.accentMap).forEach((letter) => {
    window.accentMap[letter].forEach((aLetter) => {
      window.reverseAccentMap[aLetter] = letter;
    });
  });
  window.accentedChars = new Set(Object.keys(window.reverseAccentMap));

  window.isDiscord = false;

  initializeDiscordApp();


  for (var i = 0; i < 25; i++) {
    window.stats.free.wr[0].push([0, 0]);
    window.stats.free.wr[1].push([0, 0]);
    window.stats.free.score[0].push(0);
    window.stats.free.score[1].push(0);
  }

  loadTimer();

  if (getStorage('freeStats') == null) { //set up stats
    setStorage('freeStats', JSON.stringify(window.stats.free));
  }
  if (getStorage('dailyStats') == null) { //set up stats
    setStorage('dailyStats', JSON.stringify(window.stats.daily));
  }

  if (getStorage('daily')) { //check for new day in daily
    let tmp = JSON.parse(getStorage('daily'));
    if (tmp.doy == undefined || getDateNumber() != tmp.doy) {
      removeStorage('daily');
    }
  }

  //set up storage
  if (getStorage('befuddle') == null) { //first time user
    setStorage('befuddle', JSON.stringify(window.game));

    //get browser preferred theme
    window.game.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    window.firstTime = true;
    setTheme();
  } else {
    window.firstTime = false;
    window.game = JSON.parse(getStorage('befuddle'));

    if (window.game.theme == '')
      window.game.theme = 'light';

    setStorage('befuddle', JSON.stringify(window.game));

    //set free stats
    if (getStorage('freeStats') == null)
      setStorage('freeStats', JSON.stringify(window.stats.free));
    else
      window.stats.free = JSON.parse(getStorage('freeStats'));

    //set daily stats
    if (getStorage('dailyStats') == null)
      setStorage('dailyStats', JSON.stringify(window.stats.daily));
    else
      window.stats.daily = JSON.parse(getStorage('dailyStats'));
    setTheme();
  }

  //setup onclick for top nav buttons
  document.getElementById('stats-button').addEventListener('click', function () {
    statsModal();
  });
  document.getElementById('menu-button').addEventListener('click', function () {
    menuModal();
  });
  document.getElementById('settings-button').addEventListener('click', function () {
    settingsModal();
  });
  document.getElementById('help-button').addEventListener('click', function () {
    helpModal();
  });
  document.getElementById('seeCard').addEventListener('click', function () {
    seeCardHandler();
  });

  //add checking tab focus
  document.addEventListener('visibilitychange', checkTabFocused);

  //setup the keyboard
  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    window.displayKeyboard[li[i].innerText.toLowerCase()] = li[i];
    li[i].setAttribute('data-key', li[i].innerText);
    li[i].addEventListener('click', function () {
      if (!window.gameSesh.end) {
        submitLetter(this.getAttribute('data-key').toLowerCase());
      }
    });
  }

  //setup keyboard typing
  document.onkeypress = function (e) {
    e = e || window.event;
    if (!window.gameSesh.end && !window.reportingBug && e.keyCode >= 97 && e.keyCode <= 122) {
      submitLetter(String.fromCharCode(e.keyCode));
    }
    if (!window.gameSesh.end && !window.reportingBug && e.keyCode >= 65 && e.keyCode <= 90) {
      submitLetter(String.fromCharCode(e.keyCode).toLowerCase());
    }
  };

  //set game mode
  window.game.mode = '';

  //get Discord activity launch configs
  let discordLaunchParam = getDiscordLaunchConfig();

  //specific link to card
  if (getParameterByName('cardId')) {
    window.game.mode = 'free';
    window.gameSesh.end = true;
    loadGame();
  } else if (getParameterByName('daily')
  ) {
    console.log('Daily link detected');
    startDaily();
  } else if (discordLaunchParam === 'daily') {
    console.log('Discord daily trigger detected');
    startDaily();
  } else {
    mainMenuDisplay();
  }


});

//gets date corresponding number for daily befuddle
function getDateNumber() {
  const d1 = new Date('5/6/2022 0:00');
  let d2 = new Date();
  d2.setHours(0, 0, 0);
  return Math.floor((d2.getTime() - d1.getTime()) / 86400000) - 1;
}
