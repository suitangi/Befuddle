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

//function to request random card data from scryfall api
function requestCard(id) {
  window.mtgCard = {};
  window.mtgCard.win = false;
  window.mtgCard.id = id;
  window.mtgCard.wrongGuess = '';
  window.mtgCard.lives = window.settings.lives;
  window.mtgCard.guesses = new Set();

  // document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;
  document.getElementById("cardImage").style = "opacity:0; transition: opacity 0s;";
  document.getElementById("imageLoading").style = "";
  fetch('https://api.scryfall.com/cards/' + id)
    .then(response => response.json())
    .then(data => loadCard(data));
}


//function to load the card data into memory
function loadCard(data) {
  window.mtgCard.cardData = data;

  //reset display keyboard
  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    li[i].classList.remove('correct');
    li[i].classList.remove('incorrect');
    li[i].classList.remove('redText');
    li[i].innerText = li[i].getAttribute('data-key');
  }

  // select card face if MDFC or transform
  if (data['layout'] == 'transform' || data['layout'] == 'modal_dfc') {
    window.mtgCard.cardFace = Math.floor(Math.random() * data['card_faces'].length);
    let cf = data['card_faces'][window.mtgCard.cardFace];
    data['mana_cost'] = cf['mana_cost'];
    data['image_uris'] = cf['image_uris'];
    data['name'] = cf['name'];
  }

  let html = '';

  //get mana costs
  if (data['mana_cost'] == '') {
    html = 'No mana cost';
  } else {
    window.mtgCard.manaCost = [];
    if (data['layout'] == 'split' || data['layout'] == 'adventure' || data['layout'] == 'flip') {
      let tmp = data['mana_cost'].split(' // '); //for the double faced/ 2 in 1 cards
      for (var i = 0; i < tmp.length; i++) {
        if (i > 0)
          window.mtgCard.manaCost.push('//');
        window.mtgCard.manaCost = window.mtgCard.manaCost.concat(tmp[i].substring(1, tmp[i].length - 1).split('}{'));
      }
    } else {
      window.mtgCard.manaCost = window.mtgCard.manaCost.concat(data['mana_cost'].substring(1, data['mana_cost'].length - 1).split('}{'));
    }

    for (var i = 0; i < window.mtgCard.manaCost.length; i++) {
      if (window.mtgCard.manaCost[i] == '')
        continue;
      else if (window.mtgCard.manaCost[i] == '//')
        html += ' // ';
      else {
        html += '<img class="manaSymbol" src="' + window.mtgSymbols[window.mtgCard.manaCost[i]] + '">';
      }
    }
  }

  html += '<br><br>';
  document.getElementById('cardMana').innerHTML = html;

  var img = document.getElementById("cardImage");
  var newImg = new Image;
  newImg.onload = function() {
    img.src = this.src;
    document.getElementById("cardImage").style = "opacity:1;";
    document.getElementById("imageLoading").style = "display:none;";
  }
  newImg.src = data['image_uris']['art_crop'];

  let str = data['name'];
  window.mtgCard.hiddenName = hideName(str);
  document.getElementById("cardName").innerText = window.mtgCard.hiddenName;
  document.getElementById('card').style = "";
}

//letter submtted by player
function submitLetter(char) {

  //if letter already guessed, return
  if (window.mtgCard.guesses.has(char))
    return;
  window.mtgCard.guesses.add(char);

  let found = false;

  //search in real card name and replace with correct letter
  let uChar = char.toUpperCase();
  let s = window.mtgCard.cardData.name;
  let r = '';
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) == char || s.charAt(i) == uChar) {
      found = true;
      r += s.charAt(i);
    } else {
      r += window.mtgCard.hiddenName.charAt(i);
    }
  }


  if (!found) { //letter is not in card name
    window.mtgCard.wrongGuess += char;
    //document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;
    window.displayKeyboard[char].classList.add('incorrect');

    if (window.mtgCard.lives != -1) {
      window.mtgCard.lives--;
      window.displayKeyboard[char].classList.add('redText');
      if (window.mtgCard.lives > 0) {
        for (e of document.getElementsByClassName('incorrect')) {
          e.innerText = window.mtgCard.lives;
        }
      } else { //game lost

      }
    }
  } else { //letter is in cardname
    window.displayKeyboard[char].classList.add('correct');
    window.mtgCard.hiddenName = r;
    document.getElementById("cardName").innerText = window.mtgCard.hiddenName;


    //player got the card
    if (window.mtgCard.hiddenName == window.mtgCard.cardData.name) {
      gameWin();
    }
  }
}

//handler for winning the game
function gameWin() {
  let terms = ['Compleat Perfection!', 'Ancestrally Recalled', 'Thought Twice', 'Pondered Well', 'Delved into Secrets', 'Pieces Pored Over', 'Faithlessly Looted', 'Tome Scoured', 'Dashed Hopes', 'Thoughts Siezed',
    'Mind Ground', 'Wildly Guessed', 'Yawgmoth\'s Wouldn\'t', 'Triskaidekaphobia!', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank',
    'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank', 'Gone Blank'
  ];

  let html;
  if (window.mtgCard.cardData['layout'] == 'transform' || window.mtgCard.cardData['layout'] == 'modal_dfc') {
    html = '<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front">' +
      '<img src=\"' + window.mtgCard.cardData['card_faces'][window.mtgCard.cardFace]['image_uris']['normal'] + '\" style=\"border-radius:5%;\"><span class="material-symbols-outlined flip-symbol-front"> chevron_right </span></div> <div class="flip-card-back">' +
      '<img src=\"' + window.mtgCard.cardData['card_faces'][1 - window.mtgCard.cardFace]['image_uris']['normal'] + '\" style=\"border-radius:5%;\"><span class="material-symbols-outlined flip-symbol-back"> chevron_left </span></div></div></div>';
  } else {
    html = "<img src=\"" + window.mtgCard.cardData.image_uris.normal + "\" style=\"border-radius:5%;\">";
  }
  window.mtgCard.win = true;

  let wr = window.mtgCard.wrongGuess.length;
  $.confirm({
    title: "<span style=\"font-family: 'Beleren Bold';font-size:25px;\">" + terms[wr] +
      (wr != 0 ? (" — " + wr + " incorrect") : '') + "</span>",
    content: html,
    theme: 'dark',
    animation: 'top',
    closeAnimation: 'top',
    animateFromElement: false,
    boxWidth: 'min(400px, 80%)',
    draggable: false,
    useBootstrap: false,
    typeAnimated: true,
    buttons: {
      link: {
        text: "Share",
        btnClass: 'btn-green',
        action: function(linkButton) {
          var str = 'Befuddle: ' + wr + ' wrong guess' + (wr == 1 ? '' : 'es') + '. \nhttps://suitangi.github.io/MTGHangman/?cardId=' + window.mtgCard.id;
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
            $.dialog({
              title: 'Error',
              content: 'Clipboard access denied, you can manually copy the text below:<br>' + str,
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
          });
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

//function to hide the name of the card
function hideName(str) {
  let s = str.toLowerCase();
  let c;
  let r = '';
  for (var i = 0; i < s.length; i++) {
    c = s.charCodeAt(i);
    if (c >= 97 && c <= 122)
      r += '_';
    else
      r += str.charAt(i);
  }
  return r;
}

//function to handle status button
function statsModal() {
  $.dialog({
    title: '<span style=\"font-family: \'Beleren Bold\';font-size:25px;\">Statistics</span>',
    content: '<span style=\"font-family: \'Beleren Bold\';\">Statistics Page\nStatistics Page\nStatistics Page\nStatistics Page\nStatistics Page\nStatistics Page\nStatistics Page\nStatistics Page\n</span>',
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

//start script
$(document).ready(function() {

  console.log('https://scryfall.com/card/unh/30/cheatyface')

  window.displayKeyboard = {};
  window.settings = {};
  window.settings.lives = -1;

  //setup the keyboard
  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    window.displayKeyboard[li[i].innerText.toLowerCase()] = li[i];
    li[i].setAttribute('data-key', li[i].innerText);
    li[i].addEventListener('click', function() {
      submitLetter(this.getAttribute('data-key').toLowerCase());
    });
  }

  //hide card for now (prevent fuoc)
  document.getElementById('card').style = "display:none;";

  //fetch list then request
  fetch('https://raw.githubusercontent.com/suitangi/MTGHangman/main/cardList.json')
    .then(response => response.json())
    .then(data => {
      window.cardList = data;
      if (getParameterByName('cardId'))
        requestCard(getParameterByName('cardId'));
      else
        requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
    });

  //setup onclick for top nav button
  document.getElementById('stats-button').addEventListener('click', function() {
    statsModal();
  });

  //setup keyboard typing
  document.onkeypress = function(e) {
    e = e || window.event;
    if (!window.mtgCard.win && e.keyCode >= 97 && e.keyCode <= 122) {
      submitLetter(String.fromCharCode(e.keyCode));
    }
    if (!window.mtgCard.win && e.keyCode >= 65 && e.keyCode <= 90) {
      submitLetter(String.fromCharCode(e.keyCode).toLowerCase());
    }
  };

});
