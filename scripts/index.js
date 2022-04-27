//function to request random card data from scryfall api
function requestCard() {
  window.mtgCard = {};
  window.mtgCard.win = false;
  window.mtgCard.wrongGuess = '';
  document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;

  fetch('https://api.scryfall.com/cards/random')
    .then(response => response.json())
    .then(data => loadCard(data));
}


//function to load the card data into memory
function loadCard(data) {
  window.mtgCard.cardData = data;

  let html = '';

  //get mana costs
  if (data['mana_cost'] == '') {
    html = 'No mana cost';
  } else {
    let tmp = data['mana_cost'].split(' // '); //for the double faced/ 2 in 1 cards
    window.mtgCard.manaCost = [];
    for (var i = 0; i < tmp.length; i++) {
      if (i > 0)
        window.mtgCard.manaCost.push('//');
      window.mtgCard.manaCost = window.mtgCard.manaCost.concat(tmp[i].substring(1, tmp[i].length - 1).split('}{'));
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

  if (data['set_type'] == 'token') {
    requestCard();
    return;
  }

  document.getElementById("cardImage").src = data['image_uris']['art_crop'];

  let str = data['name'];
  window.mtgCard.hiddenName = hideName(str);
  document.getElementById("cardName").innerText = window.mtgCard.hiddenName;
  document.getElementById('card').style = "";
}

function submitLetter(char) {

  const asciiOffset = 32;

  let found = false;
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
  if (!found) {
    if (!window.mtgCard.wrongGuess.includes(char)) {
      window.mtgCard.wrongGuess += char;
      document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;
    }
  } else {
    window.mtgCard.hiddenName = r;
    document.getElementById("cardName").innerText = window.mtgCard.hiddenName;

    //player got the card
    if (window.mtgCard.hiddenName == window.mtgCard.cardData.name) {
      window.mtgCard.win = true;
      $.confirm({
        title: "<span style=\"font-family: 'Beleren Bold';font-size:30px;\">Nice</span>",
        content: "<span style=\"font-family: 'Beleren Bold';\">" + window.mtgCard.wrongGuess.length + " wrong letter(s).</span>",
        theme: 'dark',
        animation: 'top',
        closeAnimation: 'top',
        animateFromElement: false,
        boxWidth: '400px',
        draggable: false,
        bgOpacity: 0,
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          close: {
            text: "Next Card",
            btnClass: 'btn-blue',
            keys: ['enter'],
            action: function() {
              requestCard();
            }
          }
        }
      });
    }
  }
}

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

//start script
$(document).ready(function() {

  document.getElementById('card').style = "display:none;";
  requestCard();

  document.onkeypress = function(e) {
    e = e || window.event;
    if (!window.mtgCard.win && e.keyCode >= 97 && e.keyCode <= 122) {
      submitLetter(String.fromCharCode(e.keyCode));
    }
  };

});
