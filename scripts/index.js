//Helper: Get Query
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//helper (mostly to clear listeners)
function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

//function to request random card data from scryfall api
function requestCard(id) {

  document.getElementById("cardImage").style = "opacity:0; transition: opacity 0s;";
  document.getElementById("imageLoading").style = "";
  fetch('https://api.scryfall.com/cards/' + id)
    .then(response => response.json())
    .then(data => loadCard(data));
}

//helper to see if char is an English letter
function isAlpha(char) {
  c = char.toLowerCase().charCodeAt(0);
  return c >= 97 && c <= 122;
}


//function to load the card data into memory
function loadCard(data) {

  if (data) {
    //setup new mtg card object
    window.mtgCard = {};
    window.mtgCard.id = data['id'];
    window.mtgCard.layout = data['layout'];
    window.mtgCard.mana_cost = data['mana_cost'];

    window.mtgCard.name = data['name'];
    window.mtgCard.colors = data['colors'];

    if (window.mtgCard['layout'] == 'transform' || window.mtgCard['layout'] == 'modal_dfc') {
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
    window.gameSesh.tlv = window.game[window.game.mode].lives;

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

  // select card face if MDFC or transform
  if (window.mtgCard['layout'] == 'transform' || window.mtgCard['layout'] == 'modal_dfc') {
    if (getParameterByName('cf'))
      window.mtgCard.cf = parseInt(getParameterByName('cf'));
    else
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
        let tmp = window.mtgCard['mana_cost'].split(' // '); //for the double faced/ 2 in 1 cards
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
          html += '<img class="manaSymbol" alt="' + window.mtgCard.manaCost[i] + '" src="' + window.mtgSymbols[window.mtgCard.manaCost[i]] + '">';
        }
      }
    }
    html += '<br><br>';
  } //show colors
  else if ((window.game.mode == 'free' && window.gameSesh.manastate == 1)) {
    html = 'Color' + (window.mtgCard['colors'].length < 2 ? '' : 's') + ': '
    if (window.mtgCard['colors'].length == 0) {
      html += '<img class="manaSymbol" src="' + window.mtgSymbols["C"] + '">';
    } else {
      for (var i = 0; i < window.mtgCard['colors'].length; i++) {
        html += '<img class="manaSymbol" alt="' + window.mtgCard['colors'][i] + '" src="' + window.mtgSymbols[window.mtgCard['colors'][i]] + '">';
      }
    }
    html += '<br><br>';
  } else { //show nothing
    html = '';
  }

  document.getElementById('cardMana').innerHTML = html;

  var img = document.getElementById("cardImage");
  var newImg = new Image;
  newImg.onload = function() {
    img.src = this.src;
    document.getElementById("cardImage").style = "opacity:1;";
    document.getElementById("imageLoading").style = "display:none;";
  }
  newImg.src = window.mtgCard['image_uris']['art_crop'];

  let str = window.mtgCard['name'];

  if (window.gameSesh.hideBlanks)
    window.gameSesh.hiddenName = hideName(str, '');
  else
    window.gameSesh.hiddenName = hideName(str, '_');

  document.getElementById("cardName").innerText = window.gameSesh.hiddenName;
  document.getElementById('card').style = "";
}

//function to laod guesses when reconnected to a game
function loadGuesses() {
  window.loadingGuesses = true;
  let g = window.gameSesh.guesses;
  window.gameSesh.wrongGuess = '';
  window.gameSesh.guesses = '';
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
  let r = '';
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) == char || s.charAt(i) == uChar) {
      found = true;
      r += s.charAt(i);
    } else {
      if (!window.gameSesh.hideBlanks)
        r += window.gameSesh.hiddenName.charAt(i);
      else {
        if (window.gameSesh.guesses.includes(s.toLowerCase().charAt(i)) || !isAlpha(s.charAt(i)))
          r += s.charAt(i);
      }
    }
  }


  if (!found) { //letter is not in card name
    window.gameSesh.wrongGuess += char;
    window.displayKeyboard[char].classList.add('incorrect');

    //add to stat if not loadingGuesses
    if (!window.loadingGuesses) {
      if (!window.gameSesh.hideBlanks)
        window.stats[window.game.mode].acc[1]++;
      else
        window.stats[window.game.mode].acc[3]++;
      Cookies.set(window.game.mode + 'Stats', JSON.stringify(window.stats[window.game.mode]), {
        expires: 365
      });
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
          gameLostDaily();
        }
      }
    }
  } else { //letter is in cardname
    window.displayKeyboard[char].classList.add('correct');
    window.gameSesh.hiddenName = r;
    document.getElementById("cardName").innerText = window.gameSesh.hiddenName;

    //add to stat if not loadingGuesses
    if (!window.loadingGuesses) {
      if (!window.gameSesh.hideBlanks)
        window.stats[window.game.mode].acc[0]++;
      else
        window.stats[window.game.mode].acc[2]++;
      Cookies.set(window.game.mode + 'Stats', JSON.stringify(window.stats[window.game.mode]), {
        expires: 365
      });
    }

    //player win!
    if (window.gameSesh.hiddenName == window.mtgCard.name) {
      window.gameSesh.end = true;
      document.getElementById('seeCard').style = '';

      if (window.game.mode == 'free') {
        gameWinFree();
      } else if (window.game.mode == 'daily') {
        gameWinDaily();
      }
    }
  }

  //save game session data do cookie
  Cookies.set(window.game.mode, JSON.stringify(window.gameSesh), {
    expires: 365
  });
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
    Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
      expires: 365
    });
  }

  $.confirm({
    title: "<span style=\"font-family: 'Beleren Bold';font-size:25px;\">Totally Lost</span>",
    content: getCardHtml(),
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          var str = 'Befuddle:\n' + (window.gameSesh.tlv == -1 ? 'Gave Up' : ('X/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '') +
            '\nhttps://suitangi.github.io/Befuddle/?cardId=' + window.mtgCard.id +
            (window.mtgCard.cf != -1 ? ('&cf=' + window.mtgCard.cf) : '');
          clipboardHandler(linkButton, str);
          return false;
        }
      },
      close: {
        text: "Next Card",
        btnClass: 'btn-blue',
        keys: ['enter'],
        action: function() {
          requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
        }
      }
    }
  });
}

//handler for game lost scenario in free mode
function gameLostDaily() {

  //new daily stat, not just a refresh
  let doy = (new Date()).getDOY();
  if (window.stats.daily.doy != doy) {
    window.stats.daily.doy = doy
    window.stats.daily.streak = 0;
    if (!window.gameSesh.hideBlanks) {
      window.stats.daily.WL[1]++;
    } else {
      window.stats.daily.WL[3]++;
    }
    Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
      expires: 365
    });
  }

  $.confirm({
    title: "<span style=\"font-family: 'Beleren Bold';font-size:25px;\">Totally Lost</span>",
    content: getCardHtml(),
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      close: {
        text: "Stats",
        btnClass: 'btn-blue',
        action: function() {
          statsModal();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          let d = new Date();
          let str = 'Daily Befuddle ' + d.toLocaleDateString("en-US") + '\nX' + (window.gameSesh.hideBlanks ? '*' : '') + '\nhttps://suitangi.github.io/Befuddle/';
          clipboardHandler(linkButton, str);
          return false;
        }
      }
    }
  });
}


//handler for winning the game in daily mode
function gameWinDaily() {

  let wr = window.gameSesh.wrongGuess.length;
  let doy = (new Date()).getDOY();

  //new daily stat, not just a refresh
  if (window.stats.daily.doy != doy) {
    window.stats.daily.doy = doy
    window.stats.daily.streak++;
    if (window.stats.daily.streak > window.stats.daily.maxStk)
      window.stats.daily.maxStk = window.stats.daily.streak;
    if (!window.gameSesh.hideBlanks) {
      window.stats.daily.score[0][wr]++;
      window.stats.daily.WL[0]++;
    } else {
      window.stats.daily.score[1][wr]++;
      window.stats.daily.WL[2]++;
    }
    Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
      expires: 365
    });
  }

  $.confirm({
    title: "<span style=\"font-family: 'Beleren Bold';\">" + getWinTerms(wr) +
      (wr != 0 ? (" — " + wr + " wrong") : '') + "</span>",
    content: getCardHtml(),
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      close: {
        text: "Stats",
        btnClass: 'btn-blue',
        action: function() {
          statsModal();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          let d = new Date();
          let str = 'Daily Befuddle ' + d.toLocaleDateString("en-US") + '\n' + wr + '/' + window.game.daily.lives + (window.gameSesh.hideBlanks ? '*' : '') + '\nhttps://suitangi.github.io/Befuddle/';
          clipboardHandler(linkButton, str);
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
  Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
    expires: 365
  });

  $.confirm({
    title: "<span style=\"font-family: 'Beleren Bold';\">" + getWinTerms(wr) +
      (wr != 0 ? (" — " + wr + " wrong") : '') + "</span>",
    content: getCardHtml(),
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    closeIcon: true,
    buttons: {
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          var str = 'Befuddle: \n' +
            wr + (window.gameSesh.tlv == -1 ? (' wrong guess' + (wr == 1 ? '' : 'es')) : ('/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '') +
            ' \nhttps://suitangi.github.io/Befuddle/?cardId=' + window.mtgCard.id +
            (window.mtgCard.cf != -1 ? ('&cf=' + window.mtgCard.cf) : '');
          clipboardHandler(linkButton, str);
          return false;
        }
      },
      close: {
        text: "Next Card",
        btnClass: 'btn-blue',
        keys: ['enter'],
        action: function() {
          if (window.cardList)
            requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
          else
            loadGame();
        }
      }
    }
  });
}

//handler for the clipboard buttons
function clipboardHandler(linkButton, str) {
  navigator.clipboard.writeText(str).then(function() {
    linkButton.addClass('displayButton');
    linkButton.setText('Copied!');
    linkButton.addClass('btn-dark');
    linkButton.removeClass('btn-green');
    setTimeout(function(lb) {
      linkButton.removeClass('btn-dark');
      linkButton.addClass('btn-green');
    }, 100, linkButton);
    setTimeout(function(lb) {
      linkButton.setText('Share');
    }, 3000, linkButton);
  }, function() {
    clipboardError(str);
  });
}


//function to display clipboard error
function clipboardError(str) {
  $.dialog({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Error: Clipboard Access Denied</span>',
    content: '<span style=\"font-family: \'Beleren Bold\';\">You can manually copy the text below:<br><br><div class=\"copyText\">' + str + '</div></span>',
    type: 'red',
    theme: 'dark',
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
    html = '<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front">' +
      '<img src=\"' + window.mtgCard['card_faces'][window.mtgCard.cf]['image_uris']['normal'] + '\" style=\"border-radius:5%;\"><span class="material-symbols-outlined flip-symbol-front"> chevron_right </span></div> <div class="flip-card-back">' +
      '<img src=\"' + window.mtgCard['card_faces'][1 - window.mtgCard.cf]['image_uris']['normal'] + '\" style=\"border-radius:5%;\"><span class="material-symbols-outlined flip-symbol-back"> chevron_left </span></div></div></div>';
  } else {
    html = "<img src=\"" + window.mtgCard.image_uris.normal + "\" style=\"border-radius:5%;\">";
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
  let r = '';
  for (var i = 0; i < str.length; i++) {
    if (isAlpha(str.charAt(i)))
      r += c;
    else
      r += str.charAt(i);
  }
  return r;
}

//function to handle the help button
function helpModal() {
  if (window.game.mode == 'daily') {
    $.dialog({
      title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">How to Play</span>',
      content: '<span style=\"font-family: \'Beleren Bold\';\">This is the help page for the daily game</span>',
      theme: 'dark',
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
      title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">How to Play</span>',
      content: '<span style=\"font-family: \'Beleren Bold\';\">This is the help page for the free play game</span>',
      theme: 'dark',
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
      '<br><span class="menuText" id="hmdisplay">Hidden mode</span>' +
      '<label class="switch"><input id="hmInput" type="checkbox" ' + (window.game.free.hideBlanks ? 'checked' : '') + '><div><span></span></div></label>' +
      '<span class="smallText">Hidden mode hides the letter blanks.</span>' +
      '<br><br><div class="hr"></div><span class="smallText">Changes won\'t apply until the next game you play.</span><br>' +
      '</div>';

    $.dialog({
      title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Options</span>',
      content: gameSettingsHtml,
      theme: 'dark',
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false,
      onContentReady: function() {
        let hi = this.$content.find('#hmInput');
        hi.on('input', function() {
          window.game.daily.hideBlanks = this.checked;
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });
      }
    });
  } else if (window.game.mode == 'free') {

    let manastates = ['Show Nothing', 'Show Colors', 'Show Mana Cost'];

    gameSettingsHtml += '<div class="gameSettings">' +
      '<br><span class="menuText">Lives: <span id="livesdisplay">' + (window.game.free.lives == -1 ? 'Off' : window.game.free.lives) + '</span></span>' +
      '<div class="slidecontainer"><input id="livesInput" type="range" min="0" max="25" value="' + window.game.free.lives + '" class="slider"></div>' +
      '<br><span class="menuText" id="manadisplay">' + manastates[window.game.free.manaState] + '</span>' +
      '<div class="slidecontainer"><input id="manaInput" type="range" min="0" max="2" value="' + window.game.free.manaState + '" class="slider"></div>' +
      '<br><span class="menuText" id="hidedisplay">Hidden Mode</span>' +
      '<label class="switch"><input id="hideInput" type="checkbox" ' + (window.game.free.hideBlanks ? 'checked' : '') + '><div><span></span></div></label>' +
      '<span class="smallText">Hidden mode hides the letter blanks.</span>' +
      '<br><br><div class="hr"></div><span class="smallText">Game changes won\'t be adjusted until next card.</span><br>' +
      '</div>';
    $.dialog({
      title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Options</span>',
      content: gameSettingsHtml,
      theme: 'dark',
      animation: 'top',
      closeAnimation: 'top',
      animateFromElement: false,
      boxWidth: 'min(400px, 80%)',
      draggable: false,
      backgroundDismiss: true,
      useBootstrap: false,
      onContentReady: function() {
        let lv = this.$content.find('#livesInput');
        lv.on('input', function() {
          if (this.value > 0) {
            document.getElementById('livesdisplay').innerText = this.value;
            window.game.free.lives = parseInt(this.value);
          } else if (this.value == 0) {
            document.getElementById('livesdisplay').innerText = 'Off';
            window.game.free.lives = -1;
          }
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });

        let mi = this.$content.find('#manaInput');
        mi.on('input', function() {
          let manastates = ['Show Nothing', 'Show Colors', 'Show Mana Cost'];
          window.game.free.manaState = parseInt(this.value);
          document.getElementById('manadisplay').innerText = manastates[parseInt(this.value)];
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });

        let hi = this.$content.find('#hideInput');
        hi.on('input', function() {
          window.game.free.hideBlanks = this.checked;
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });
      }
    });
  }
}

//function to handle status button
function statsModal() {

  let html = '';
  if (window.game.mode == 'daily') {
    html += '<span style=\"font-family: \'Beleren Bold\';\">Statistics Page</span>' +
      '<canvas id="wrChart"></canvas>' +
      '<canvas id="scoreChart"></canvas>'
  } else if (window.game.mode == 'free') {

  }

  $.dialog({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Statistics</span>',
    content: html,
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function() {
      if (window.game.mode == 'daily') {
        dailyChartsSetup();
      } else if (window.game.mode == 'free') {

      }
    }
  });
}

function dailyChartsSetup() {
  mspie(document.getElementById('wrChart').getContext('2d'), {
    labels: ['Normal Win', 'Normal Loss', 'Hidden Win', 'Hidden Loss'],
    datasets: [{
      backgroundColor: ['#32B1DC', '#DC5C32'],
      data: [window.stats.daily.WL[0], window.stats.daily.WL[1]]
    }, {
      backgroundColor: ['#18728F', '#8F3618'],
      data: [window.stats.daily.WL[2], window.stats.daily.WL[3]]
    }]
  }, 'Daily Win/Loss');
  vertBarChart(document.getElementById('scoreChart').getContext('2d'), {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [{
      label: 'Normal Mode',
      data: window.stats.daily.score[0],
      backgroundColor: '#32B1DC',
      borderWidth: 1
    }, {
      label: 'Hidden Mode',
      data: window.stats.daily.score[1],
      backgroundColor: '#18728F',
      borderWidth: 1
    }]
  }, 'Score Distribution')
}

//function to handle menu button
function menuModal() {
  $.dialog({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Befuddle</span>',
    content: '<span style=\"font-family: \'Beleren Bold\';\">Menu modal here: some buttons and some other ui</span>',
    theme: 'dark',
    animation: 'left',
    closeAnimation: 'left',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false
  });
}


//function for the continue game? modal
function continueGameModal() {
  $.confirm({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Continue?</span>',
    content: '<span style=\"font-family: \'Beleren Bold\';\">Previous game data found, would you like to continue?</span>',
    theme: 'dark',
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
        action: function() {
          window.gameSesh.end = true;
          Cookies.remove('free');
          loadGame();
        }
      },
      daily: {
        text: 'Continue',
        btnClass: 'btn-blue',
        action: function() {
          loadGame();
        }
      }
    }
  });
}

//function to display initial main menu
function mainMenuDisplay() {
  $.confirm({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:30px;line-height: 30px;\">Welcome to Befuddle</span>',
    content: '<span style=\"font-family: \'Beleren Bold\';user-select:none;\">Select your game mode:</span>',
    theme: 'supervan',
    animation: 'opacity',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: false,
    backgroundDismissAnimation: 'none',
    useBootstrap: false,
    buttons: {
      daily: {
        text: '<span style=\"font-family: \'Beleren Bold\';user-select:none;\">Daily Befuddle</span>',
        action: function() {
          window.game.mode = 'daily';
          if (Cookies.get(window.game.mode)) {
            window.gameSesh = JSON.parse(Cookies.get(window.game.mode));
            window.mtgCard = window.gameSesh.card;
            if (window.gameSesh.end && window.gameSesh.hiddenName == window.mtgCard.name)
              window.gameSesh.end = false;
          }
          loadGame();
        }
      },
      free: {
        text: '<span style=\"font-family: \'Beleren Bold\';user-select:none;\">Free Play</span>',
        action: function() {
          window.game.mode = 'free';
          if (Cookies.get(window.game.mode)) {
            window.gameSesh = JSON.parse(Cookies.get(window.game.mode));
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

//functinon to load the game
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
    return; //don't load a new game
  }

  //Fetch different things based on different mode
  if (window.game.mode == 'daily') {
    //fetch card list then request
    fetch('https://raw.githubusercontent.com/suitangi/Befuddle/main/dailyList.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById("cardImage").style = "opacity:0; transition: opacity 0s;";
        document.getElementById("imageLoading").style = "";
        let d = new Date();
        loadCard(data[d.getDOY()]);
      });
  } else if (window.game.mode == 'free') {
    //fetch card list then request
    fetch('https://raw.githubusercontent.com/suitangi/Befuddle/main/cardList.json')
      .then(response => response.json())
      .then(data => {
        window.cardList = data;
        if (getParameterByName('cardId'))
          requestCard(getParameterByName('cardId'));
        else
          requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
      });
  }
}

//see if today is a new day locally
function checkNewDay() {
  d1 = new Date(window.game.timestamp);
  d2 = new Date();
  return d1.getDOY() != d2.getDOY();
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
          position: 'right',
          labels: {
            generateLabels: function(chart) {
              // Get the default label list
              const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const labelsOriginal = original.call(this, chart);

              // Build an array of colors used in the datasets of the chart
              let datasetColors = chart.data.datasets.map(function(e) {
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
            color: 'white',
            font: {
              family: 'Roboto Mono'
            },
          },
          onClick: function(mouseEvent, legendItem, legend) {
            // toggle the visibility of the dataset from what it currently is
            legend.chart.getDatasetMeta(
              legendItem.datasetIndex
            ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
            legend.chart.update();
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
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
          color: 'white',
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

function vertBarChart(ctx, data, title) {
  return new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white',
            stepSize: 1
          },
          grid: {
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
            color: 'white'
          },
          grid: {
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
          labels: {
            color: 'white',
            font: {
              family: 'Roboto Mono'
            },
          }
        },
        title: {
          display: true,
          color: 'white',
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

//start script
$(document).ready(function() {

  console.log('https://scryfall.com/card/unh/30/cheatyface');

  window.displayKeyboard = {};
  window.loadingGuesses = false;
  window.game = {};
  window.game.timestamp = (new Date()).getTime();

  window.game.daily = {};
  window.game.daily.lives = 7;
  window.game.daily.hideBlanks = false;

  window.game.free = {};
  window.game.free = {};
  window.game.free.lives = -1;
  window.game.free.manaState = 2;
  window.game.free.hideBlanks = false;

  window.gameSesh = {};
  window.gameSesh.end = true;

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

  for (var i = 0; i < 25; i++) {
    window.stats.free.wr[0].push([0, 0]);
    window.stats.free.wr[1].push([0, 0]);
    window.stats.free.score[0].push(0);
    window.stats.free.score[1].push(0);
  }


  //set up cookies
  if (Cookies.get('befuddle') == null) { //first time user
    Cookies.set('befuddle', JSON.stringify(window.game), {
      expires: 365
    });
    Cookies.set('freeStats', JSON.stringify(window.stats.free), {
      expires: 365
    });
    Cookies.set('dailyStats', JSON.stringify(window.stats.free), {
      expires: 365
    });
    window.firstTime = true;
  } else {
    window.firstTime = false;
    window.game = JSON.parse(Cookies.get('befuddle'));
    if (checkNewDay()) {
      Cookies.remove('daily');
    }
    window.game.timestamp = (new Date()).getTime();
    Cookies.set('befuddle', JSON.stringify(window.game)), {
      expires: 365
    };


    //set free stats
    if (Cookies.get('freeStats') == null)
      Cookies.set('freeStats', JSON.stringify(window.stats.free), {
        expires: 365
      });
    else
      window.stats.free = JSON.parse(Cookies.get('freeStats'));

    //set dailly stats
    if (Cookies.get('dailyStats') == null)
      Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
        expires: 365
      });
    else
      window.stats.daily = JSON.parse(Cookies.get('dailyStats'));
  }

  //setup onclick for top nav buttons
  document.getElementById('stats-button').addEventListener('click', function() {
    statsModal();
  });
  document.getElementById('menu-button').addEventListener('click', function() {
    menuModal();
  });
  document.getElementById('settings-button').addEventListener('click', function() {
    settingsModal();
  });
  document.getElementById('help-button').addEventListener('click', function() {
    helpModal();
  });
  document.getElementById('seeCard').addEventListener('click', function() {
    seeCardHandler();
  });

  //setup the keyboard
  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    window.displayKeyboard[li[i].innerText.toLowerCase()] = li[i];
    li[i].setAttribute('data-key', li[i].innerText);
    li[i].addEventListener('click', function() {
      if (!window.gameSesh.end)
        submitLetter(this.getAttribute('data-key').toLowerCase());
    });
  }

  //setup keyboard typing
  document.onkeypress = function(e) {
    e = e || window.event;
    if (!window.gameSesh.end && e.keyCode >= 97 && e.keyCode <= 122) {
      submitLetter(String.fromCharCode(e.keyCode));
    }
    if (!window.gameSesh.end && e.keyCode >= 65 && e.keyCode <= 90) {
      submitLetter(String.fromCharCode(e.keyCode).toLowerCase());
    }
  };


  //specific link to card
  if (getParameterByName('cardId')) {
    window.game.mode = 'free';
    window.gameSesh.end = true;
    loadGame();
  } else {
    mainMenuDisplay();
  }


});

//Stackoverflow it
//Get leap year
Date.prototype.isLeapYear = function() {
  var year = this.getFullYear();
  if ((year & 3) != 0) return false;
  return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
  var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var mn = this.getMonth();
  var dn = this.getDate();
  var dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};
