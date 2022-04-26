function loadCard(data) {
  window.mtgCard.cardData = data;
  document.getElementById("cardImage").src = data['image_uris']['art_crop'];

  let str = data['name'];
  window.mtgCard.hiddenName = hideName(str);
  document.getElementById("cardName").innerText = window.mtgCard.hiddenName;
  console.log(data);
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

  window.mtgCard = {};
  window.mtgCard.wrongGuess = '';
  document.getElementById("wrongGuess").innerText = window.mtgCard.wrongGuess;

  fetch('https://api.scryfall.com/cards/random')
  .then(response => response.json())
  .then(data => loadCard(data));

  document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode >= 97 && e.keyCode <= 122) {
      submitLetter(String.fromCharCode(e.keyCode));
   }
  };

});
