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
  // document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;
  document.getElementById("cardImage").style="opacity:0; transition: opacity 0s;";
  document.getElementById("imageLoading").style="";
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
  }

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

  var img = document.getElementById("cardImage");
  var newImg = new Image;
  newImg.onload = function() {
    img.src = this.src;
    document.getElementById("cardImage").style="opacity:1;";
    document.getElementById("imageLoading").style="display:none;";
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
  if (window.mtgCard.wrongGuess.includes(char))
    return;

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


  if (!found) {
    window.mtgCard.wrongGuess += char;
    //document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;
    window.displayKeyboard[char].classList.add('incorrect');
  } else { //card name complete
    window.displayKeyboard[char].classList.add('correct');
    window.mtgCard.hiddenName = r;
    document.getElementById("cardName").innerText = window.mtgCard.hiddenName;

    let terms = ['Perfect!', 'Exceptional', 'Precise', 'Great', 'Nice', 'Nice', 'Good', 'Good', 'Fine', 'Fine',
      'Almost', 'Close', 'Close', 'Modest', 'Modest', 'Rough', 'Subpar', 'Bummer', 'Bummer', 'Meager',
      'Disastrous', 'Disastrous', 'Disastrous', 'Disastrous', 'Disastrous', 'Disastrous',]

    //player got the card
    if (window.mtgCard.hiddenName == window.mtgCard.cardData.name) {
      window.mtgCard.win = true;
      $.confirm({
        title: "<br><span style=\"font-family: 'Beleren Bold';font-size:30px;\">" + terms[window.mtgCard.wrongGuess.length] +
          (window.mtgCard.wrongGuess.length !=0? (" — " + window.mtgCard.wrongGuess.length + " incorrect"): '') + "</span>",
        content: "<img src=\"" + window.mtgCard.cardData.image_uris.normal + "\" style=\"border-radius:5%;\">",
        theme: 'dark',
        animation: 'top',
        closeAnimation: 'top',
        animateFromElement: false,
        boxWidth: 'min(400px, 80%)',
        draggable: false,
        bgOpacity: 0,
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          link: {
            text: "Share",
            btnClass: 'btn-green',
            action: function(linkButton) {
              var data = [new ClipboardItem({ "text/plain": new Blob(['https://suitangi.github.io/MTGHangman/?cardId=' + window.mtgCard.id], { type: "text/plain" }) })];
              navigator.clipboard.write(data).then(function() {
                linkButton.addClass('displayButton');
                console.log("Copied to clipboard successfully!");
                linkButton.setText('Copied!');
                linkButton.addClass('btn-dark');
                linkButton.removeClass('btn-green');
                setTimeout(function(lb) {
                  linkButton.removeClass('btn-dark');
                  linkButton.addClass('btn-green');
                }, 1000, linkButton);
                setTimeout(function(lb) {
                  linkButton.setText('Share');
                }, 3000, linkButton);
              }, function() {
                console.error("Unable to write to clipboard.");
              });
              return false;
            }
          }, close: {
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

  window.displayKeyboard = {};

  let li = document.getElementById('keyboard').children;
  for (var i = 0; i < li.length; i++) {
    window.displayKeyboard[li[i].innerText.toLowerCase()] = li[i];
    li[i].addEventListener('click', function() {
      submitLetter(this.innerText.toLowerCase());
    });
  }

  document.getElementById('card').style = "display:none;";

  fetch('./cardList.json')
  .then(response => response.json())
  .then(data => {
    window.cardList = data;
    if (getParameterByName('cardId'))
      requestCard(getParameterByName('cardId'));
    else
    requestCard(window.cardList[Math.floor(Math.random() * window.cardList.length)]);
  })


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
