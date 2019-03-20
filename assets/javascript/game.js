// This is the word guess game

var mysteryWord = "";
var chosenLetters = [];
var gameNumber = 0;
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

var mysteryWordList = [
  "dilapidated",
  "screenplay",
  "screenwriting",
  "hacksaws",
  "torture",
  "chains",
  "gore",
  "blood",
  "screams"
];

//User was visually prompted by HTML page
//Add sound clip that plays after the page loads See document.ready

function play(letter) {
  if (isNewGame(letter)) {
    initiateGame();
  } else if (isLetterValid(letter)) {
    updateScreen(letter, mysteryWord, currentWord);
  }
}
function isNewGame(letter) {
  return mysteryWord === "";
}

function isLetterValid(letter) {
  return (
    alphabet.indexOf(letter) !== -1 && chosenLetters.indexOf(letter) === -1
  );
}

function initiateGame() {
  if (gameNumber < mysteryWordList.length) {
    mysteryWord = mysteryWordList[gameNumber];
  }
  gameNumber++;
  currentWord = blankLoad(mysteryWord);
  newScreen(currentWord);
  console.log(mysteryWord + currentWord);
}

function updateScreen(letter, mysteryWord, currentWord) {
  var arrayCurrentWord = [];
  for (var i = 0; i < mysteryWord.length; i++) {
    if (letter === mysteryWord.charAt(i)) {
      arrayCurrentWord = currentWord.split();
      arrayCurrentWord[i] = letter;
      currentWord = arrayCurrentWord.join();
    }
  }

  console.log(currentWord);
}

function blankLoad(mysteryWord) {
  var currentWord = "";
  for (var i = 0; i < mysteryWord.length; i++) {
    currentWord = currentWord + "_";
  }
  return currentWord;
}

function newScreen(currentWord) {
  $("#word").text(currentWord);
}
//Listen for user key press

//Initial load of word and page setup

//Pick a word at random
//Make sure it hasn't been played already
//If end is reached, say the end.
/* Check to see if letter is correct.  If no, update remaining guesses and picture.  If yes, update word.  If word is complete, win screen, update wins and start new game.  If lost, loss screen, update losses and start new game */

//Distinguish between intial load and processing guesses by looking to see if a word has been defined.

//Sound byte here?????
//================  Essentially the main loop ===================//
// Listens for key up event, captures key, converts to lower case,
// and calls the processing function.
//===============================================================//
document.onkeyup = function(event) {
  play(event.key.toLowerCase());
};
