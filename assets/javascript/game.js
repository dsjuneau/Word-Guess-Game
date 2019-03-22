// This is the word guess game

var mysteryWord = "";
var chosenLetters = "";
var gameNumber = 0;
var wins = 0;
var losses = 0;
var guesses = 12;
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
    if (mysteryWord.indexOf(letter) === -1) {
      guesses--;
      $("#buzz-sound")[0].play();
    } else {
      $("#ding-sound")[0].play();
    }
    $("#guesses").text(guesses);
    $("#guessed-letters").text(chosenLetters);
    currentWord = updateCurrentWord(letter, mysteryWord, currentWord);
    displayCurrentWord(currentWord);
    if (isWinner(currentWord)) {
      wins++;
      $("#wins").text(wins);
      initiateGame();
    } else if (guesses === 0) {
      losses++;
      $("#losses").text(losses);
      initiateGame();
    }
  }
}
function isNewGame(letter) {
  return mysteryWord === "";
}

function isLetterValid(letter) {
  if (alphabet.indexOf(letter) !== -1 && chosenLetters.indexOf(letter) === -1) {
    chosenLetters = chosenLetters + letter;
    return true;
  } else {
    return false;
  }
}

function initiateGame() {
  if (gameNumber < mysteryWordList.length) {
    mysteryWord = mysteryWordList[gameNumber];
  } else {
    gameNumber = 0;
    mysteryWord = mysteryWordList[gameNumber];
  }
  guesses = 12;
  chosenLetters = "";
  $("#guesses").text(guesses);
  $("#guessed-letters").text(chosenLetters);
  gameNumber++;
  currentWord = blankLoad(mysteryWord);
  displayCurrentWord(currentWord);
}

function updateCurrentWord(letter, mysteryWord, currentWord) {
  var intermediateCurrentWord = "";
  for (var i = 0; i < mysteryWord.length; i++) {
    if (letter === mysteryWord.charAt(i)) {
      intermediateCurrentWord = intermediateCurrentWord + letter;
    } else {
      intermediateCurrentWord = intermediateCurrentWord + currentWord.charAt(i);
    }
  }
  currentWord = intermediateCurrentWord;
  return currentWord;
}

function blankLoad(mysteryWord) {
  var currentWord = "";
  for (var i = 0; i < mysteryWord.length; i++) {
    currentWord = currentWord + "_";
  }
  return currentWord;
}

function displayCurrentWord(currentWord) {
  $("#word").text(currentWord);
}

function isWinner(currentWord) {
  if (currentWord.indexOf("_") === -1) {
    return true;
  } else {
    return false;
  }
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
$(document).ready(function() {
  $("#load-sound")[0].play();
});

document.onkeyup = function(event) {
  play(event.key.toLowerCase());
};
