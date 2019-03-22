// This is the word guess game

// Global variables
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

//Main function.  Processes a key press to initiates a new game
//track guesses, wins, and losses.
function play(letter) {
  if (isNewGame(letter)) {
    $("h1, h3").hide();
    initiateGame();
  } else if (isLetterValid(letter)) {
    if (mysteryWord.indexOf(letter) === -1) {
      guesses--;
      $("#buzz-sound")[0].play();
      $(".resultimage").animate({ opacity: 1.0 }, 0);
      $(".resultimage").animate({ opacity: 0.0 }, 1000);
    } else {
      $("#ding-sound")[0].play();
      $(".goodguess").animate({ opacity: 1.0 }, 0);
      $(".goodguess").animate({ opacity: 0.0 }, 1000);
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

// Checks if the user presses the key to start the initial game
function isNewGame(letter) {
  return mysteryWord === "";
}

// Is the key pressed a letter?  Has it been guessed alreay?
function isLetterValid(letter) {
  if (alphabet.indexOf(letter) !== -1 && chosenLetters.indexOf(letter) === -1) {
    chosenLetters = chosenLetters + letter;
    return true;
  } else {
    return false;
  }
}

// Initiate game:  Loads the word from an array, updates guesses and
// game number.  Updates screen as well.
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

//  Compares letter to word and replaces _ with letter is there is a match.
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

// Loads the display word with _
function blankLoad(mysteryWord) {
  var currentWord = "";
  for (var i = 0; i < mysteryWord.length; i++) {
    currentWord = currentWord + "_";
  }
  return currentWord;
}

// Updates the display with the current word.

function displayCurrentWord(currentWord) {
  $("#word").text(currentWord);
}

//  Checks for the win condition
function isWinner(currentWord) {
  if (currentWord.indexOf("_") === -1) {
    return true;
  } else {
    return false;
  }
}

//================ Main program starts here ===================//
//   Plays a sound then listens for key up event, captures key,
//   converts to lower case and calls the processing function.
//===============================================================//
$(document).ready(function() {
  $("#load-sound")[0].play();
});

document.onkeyup = function(event) {
  play(event.key.toLowerCase());
};
