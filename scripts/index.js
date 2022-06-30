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
    .then(data => loadCard(data))
    .catch(error => {
      $.dialog({
        title: '<span class=\"modalTitle\">Error</span>',
        content: '<span class=\"modalText\">Couldn\'t load card image and information. Check your connection and/or Scryfall API status.</span>',
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
    });
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

    if (window.game.mode == 'daily') {
      let dday = new Date();
      window.gameSesh.doy = dday.getYear() * 1000 + dday.getDOY();
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

  // select card face if MDFC or transform
  if (window.mtgCard['layout'] == 'transform' || window.mtgCard['layout'] == 'modal_dfc') {
    if (getParameterByName('cf'))
      window.mtgCard.cf = parseInt(getParameterByName('cf'));
    else if (window.game.mode == 'daily')
      window.mtgCard.cf = 0;
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

  //save loaded game if daily
  if (window.game.mode == 'daily') {
    Cookies.set('daily', JSON.stringify(window.gameSesh), {
      expires: 365
    });
  }
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

    //medium buzz
    if (window.game.vibra)
      navigator.vibrate(55);

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

    //short buzz
    if (window.game.vibra)
      navigator.vibrate(15);

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

  //save game session data to respective mode cookie
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
    Cookies.set('freeStats', JSON.stringify(window.stats.free), {
      expires: 365
    });
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
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          var str = 'Befuddle:\n' + (window.gameSesh.tlv == -1 ? 'Gave Up' : ('X/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '') +
            '\nhttps://befuddle.xyz/?cardId=' + window.mtgCard.id +
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

//handler for game lost scenario in daily mode
function gameLostDaily() {

  if (window.dailyModal !== null) {
    window.dailyModal.open();
    return;
  }

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
      free: {
        text: "Free Play",
        btnClass: 'btn-purple',
        action: function(linkButton) {
          window.gameSesh.end = true;
          window.game.mode = 'free';
          if (Cookies.get('free')) {
            window.gameSesh = JSON.parse(Cookies.get('free'));
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
        action: function() {
          statsModal();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          let d = new Date();
          let str = 'Daily Befuddle ' + d.toLocaleDateString("en-US") + '\nX' + (window.gameSesh.hideBlanks ? '*' : '') + '\nhttps://befuddle.xyz/';
          clipboardHandler(linkButton, str);
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
  let doy = (new Date()).getDOY();

  //new daily stat, not just a refresh
  if (window.stats.daily.doy != doy) {
    window.stats.daily.doy = doy
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
    Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
      expires: 365
    });

    //vibrate if on
    if (window.game.vibra)
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

  window.dailyModal = $.confirm({
    title: "<span class=\"modalText\">" + getWinTerms(wr) +
      (wr != 0 ? (" — " + wr + " wrong") : '') + "</span>",
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
      free: {
        text: "Free Play",
        btnClass: 'btn-purple',
        action: function(linkButton) {
          window.gameSesh.end = true;
          window.game.mode = 'free';
          if (Cookies.get('free')) {
            window.gameSesh = JSON.parse(Cookies.get('free'));
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
        action: function() {
          statsModal();
        }
      },
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          let d = new Date();
          let str = 'Daily Befuddle ' + d.toLocaleDateString("en-US") + '\n' + wr + '/' + window.game.daily.lives + (window.gameSesh.hideBlanks ? '*' : '') + '\nhttps://befuddle.xyz/';
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
  if (wr == 0) { //confetti if perfect game
    if (window.game.vibra)
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
  Cookies.set('freeStats', JSON.stringify(window.stats.free), {
    expires: 365
  });

  $.confirm({
    title: "<span class=\"modalText\">" + getWinTerms(wr) +
      (wr != 0 ? (" — " + wr + " wrong") : '') + "</span>",
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
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          var str = 'Befuddle: \n' +
            wr + (window.gameSesh.tlv == -1 ? (' wrong guess' + (wr == 1 ? '' : 'es')) : ('/' + window.gameSesh.tlv)) +
            (window.gameSesh.hideBlanks ? '*' : '') +
            ' \nhttps://befuddle.xyz/?cardId=' + window.mtgCard.id +
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
    linkButton.setText('Copied');
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
    title: '<span class=\"modalTitle\">Error: Clipboard Access Denied</span>',
    content: '<span class=\"modalText\">You can manually copy the text below:<br><br><div class=\"copyText\">' + str + '</div></span>',
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
      title: '<span class=\"modalTitle\">How to Play</span>',
      content: '<span class=\"helpText\">Guess the <a href="https://magic.wizards.com/en" target="_blank">Magic: The Gathering</a> Card from the art and mana cost, Hangman style. You have 7 lives, meaning after guessing 7 wrong letters, the game is over.<br><br>' +
        'After each guess, the keys will show you if the letter was incorrect, as well as the number of lives you have left.<br><br></span><div class="hr"></div>' +
        '<span class=\"helpText\">A new Befuddle will be available each day!',
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
      '<div class="gameSettings"><br><br><span class="menuText">Vibration</span>' +
      '<label class="switch"><input id="vibraInput" type="checkbox" ' + (window.game.vibra ? 'checked' : '') + '><div><span></span></div></label>' +
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
      onContentReady: function() {
        let hi = this.$content.find('#hmInput');
        hi.on('input', function() {
          window.game.daily.hideBlanks = this.checked;
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });

        let di = this.$content.find('#darkInput');
        di.on('input', function() {
          window.game.theme = (this.checked ? 'dark' : 'light');
          setTheme();
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });

        let vi = this.$content.find('#vibraInput');
        vi.on('input', function() {
          window.game.vibra = this.checked;
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });
      }
    });
  } else if (window.game.mode == 'free') {

    let manastates = ['Show Nothing', 'Show Colors', 'Show Mana Cost'];

    gameSettingsHtml += '<div class="gameSettings">' +
      '<div class="gameSettings"><br><br><span class="menuText" id="themedisplay">Dark Mode</span>' +
      '<label class="switch"><input id="darkInput" type="checkbox" ' + (window.game.theme === 'dark' ? 'checked' : '') + '><div><span></span></div></label>' +
      '<div class="gameSettings"><br><br><span class="menuText">Vibration</span>' +
      '<label class="switch"><input id="vibraInput" type="checkbox" ' + (window.game.vibra ? 'checked' : '') + '><div><span></span></div></label>' +
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

        let di = this.$content.find('#darkInput');
        di.on('input', function() {
          window.game.theme = (this.checked ? 'dark' : 'light');
          setTheme();
          Cookies.set('befuddle', JSON.stringify(window.game), {
            expires: 365
          }); //save game settings data to cookies
        });

        let vi = this.$content.find('#vibraInput');
        vi.on('input', function() {
          window.game.vibra = this.checked;
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
    onContentReady: function() {
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
          action: function() {
            window.gameSesh.end = true;
            document.getElementById('seeCard').style = '';
            if (window.game.mode == 'daily') {
              window.gameSesh.giveUp = true;
              gameLostDaily();
            } else if (window.game.mode == 'free')
              gameLostFree();
            
            Cookies.set(window.game.mode, JSON.stringify(window.gameSesh), {
              expires: 365
            });
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
      content: '<span class=\"helpText\">This will clear all cookies, delete all statisticss and all unfinished Befuddles. Are you sure?</span>',
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
          action: function() {
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
      '<div class="helpText" style="text-align: center;">Developed with <span class="material-symbols-outlined" style="font-size: 11px;font-variation-settings: \'FILL\' 1;color: #64baf7;"> favorite </span> by <a href="https://ko-fi.com/suitangi" target="_blank">Suitangi</a></div>',
    theme: window.game.theme,
    animation: 'left',
    closeAnimation: 'left',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    backgroundDismiss: true,
    useBootstrap: false,
    onContentReady: function() {
      document.getElementById('credits').addEventListener('click', function() {
        let s = document.getElementById('creditText');
        if (!s.classList.contains('collapsediv')) {
          s.classList.add('collapsediv');
          document.getElementById('creditExpand').classList.remove('rotato');
        } else {
          s.classList.remove('collapsediv');
          document.getElementById('creditExpand').classList.add('rotato');
        }
      });
      document.getElementById('disclaimer').addEventListener('click', function() {
        let s = document.getElementById('disclaimerText');
        if (!s.classList.contains('collapsediv')) {
          s.classList.add('collapsediv');
          document.getElementById('disclaimerExpand').classList.remove('rotato');
        } else {
          s.classList.remove('collapsediv');
          document.getElementById('disclaimerExpand').classList.add('rotato');
        }
      });
      document.getElementById('clearButton').addEventListener('click', function() {
        clearConfirm();
      });
      document.getElementById('returnButton').addEventListener('click', function() {
        window.gameSesh.end = true;
        menuD.close();
        mainMenuDisplay();
      });
      if (!window.gameSesh.end) {
        document.getElementById('guButton').addEventListener('click', function() {
          giveupConfirm();
        });
      }
    }
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
    onContentReady: function() {
      this.buttons.daily.el.hover(function() {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Challenge the daily Befuddle</span>');
      }, function() {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Select your game mode</span>');
      });

      this.buttons.free.el.hover(function() {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Play endlessly on free mode</span>');
      }, function() {
        mainMenuModal.setContent('<span class=\"mainMenuText\">Select your game mode</span>');
      });
    },
    buttons: {
      daily: {
        text: '<span class=\"mainMenuText\">Daily Befuddle</span>',
        action: function() {
          window.game.mode = 'daily';
          if (Cookies.get('daily')) {
            window.gameSesh = JSON.parse(Cookies.get('daily'));
            window.mtgCard = window.gameSesh.card;
            // if (checkNewDay())
            //   window.gameSesh.end = true;
            if (window.gameSesh.end) //seems counterintuitive, but is for reshowing the daily result
              window.gameSesh.end = false;
          }
          loadGame();
        }
      },
      free: {
        text: '<span class=\"mainMenuText\">Free Play</span>',
        action: function() {
          window.game.mode = 'free';
          if (Cookies.get('free')) {
            window.gameSesh = JSON.parse(Cookies.get('free'));
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

    //person gaveup, show losing screen
    if (window.game.mode == 'daily' && window.gameSesh.giveUp) {
      window.gameSesh.end = true;
      document.getElementById('seeCard').style = '';
      gameLostDaily();
      Cookies.set('daily', JSON.stringify(window.gameSesh), {
        expires: 365
      });
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
      Cookies.set('befuddle', JSON.stringify(window.game), {
        expires: 365
      });
      loadCard(data[d.getDOY()]);
    }

    if (window.dailyList == null) { //fetch first if null
      fetch('./dailyList.json')
        .then(response => response.json())
        .then(data => {
          window.dailyList = data;
          dailyCard(data);
        })
        .catch(function() {
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
        requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
    }

    if (window.cardList == null) { //fetch card list then request
      fetch('./cardList.json')
        .then(response => response.json())
        .then(data => {
          window.cardList = data;
          freeCard(data);
        })
        .catch(function() {
          console.error('Could not fetch card list');
        });
    } else { //no need to re-fetch
      freeCard(window.cardList);
    }
  }
}

//function to load the timer
function loadTimer() {

  let now = new Date();
  let midnight = new Date;
  midnight.setHours(24, 0, 0, 0);
  let seconds = (now.getMinutes() * 60 + now.getSeconds()) % 300;
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

  function timerTick() {
    if (seconds == 300) { //every 5 minutes, correct time again
      now = new Date();
      seconds = (now.getMinutes() * 60 + now.getSeconds()) % 300;
      if (now > midnight) { //midnight, load new daily game
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
      setTimeout(function(t) {
        timeTo -= t;
        timerTick();
      }, 1000 - now.getMilliseconds(), 1000 - now.getMilliseconds());
    } else {
      setTimeout(function() {
        timeTo -= 1000;
        timerTick();
      }, 1000);
    }
    if (window.dailyModal !== null && window.dailyModal.isOpen()) {
      document.getElementById('dailyTimerDisplay').innerText = 'Next Daily Befuddle │ ' + msToTime(timeTo);
    }
    seconds++;
  }

  setTimeout(function() {
    timerTick();
  }, 1000 - now.getMilliseconds());
}

//see if today is a new day locally //legacy code
// function checkNewDay() {
//   if (window.game.daily.timestamp == undefined)
//     d1 = -1;
//   else
//     d1 = new Date(window.game.daily.timestamp);
//   d2 = new Date();
//   return d1.getDOY() != d2.getDOY();
// }

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
            color: window.game.theme == 'dark' ? 'white' : 'black',
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

//start script
$(document).ready(function() {

  console.log('https://tinyurl.com/specialcardforbefuddle');

  window.displayKeyboard = {};
  window.loadingGuesses = false;
  window.dailyModal = null;

  window.game = {};
  window.game.theme = 'dark'; //dark mode default
  window.game.vibra = true;

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

  loadTimer();

  if (Cookies.get('freeStats') == null) { //set up stats
    Cookies.set('freeStats', JSON.stringify(window.stats.free), {
      expires: 365
    });
  }
  if (Cookies.get('dailyStats') == null) { //set up stats
    Cookies.set('dailyStats', JSON.stringify(window.stats.daily), {
      expires: 365
    });
  }

  if (Cookies.get('daily')) { //check for new day in daily
    let tmp = JSON.parse(Cookies.get('daily'));
    let dday = new Date();
    if (tmp.doy == undefined || (dday.getYear() * 1000 + dday.getDOY()) != tmp.doy)
      Cookies.remove('daily');
  }

  //set up cookies
  if (Cookies.get('befuddle') == null) { //first time user
    Cookies.set('befuddle', JSON.stringify(window.game), {
      expires: 365
    });

    //get browser preferred theme
    window.game.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    window.firstTime = true;
    setTheme();
  } else {
    window.firstTime = false;
    window.game = JSON.parse(Cookies.get('befuddle'));

    if (window.game.theme == '')
      window.game.theme = 'light';

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
    setTheme();
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
      if (!window.gameSesh.end) {
        submitLetter(this.getAttribute('data-key').toLowerCase());
      }
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

  //set game mode
  window.game.mode = '';

  //specific link to card
  if (getParameterByName('cardId')) {
    window.game.mode = 'free';
    window.gameSesh.end = true;
    loadGame();
  } else {
    mainMenuDisplay();
  }


});

//Lets pollute the date prototype
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
