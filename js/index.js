window.onload = start;
var boxes = document.getElementsByTagName("td");
var turnText = document.querySelector(".playerTurn");
var counter = 1;
var winCounter = 0;
var OMoves = [];
var XMoves = [];
const submitBtn = document.querySelector(".start-now");
let player1 = "";
let player2 = "";

submitBtn.onclick = () => {
  player1 = document.querySelector("#name-1").value;
  player2 = document.querySelector("#name-2").value;

  start();
};

var winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function start() {
  if (player1 == "" || player2 == "") {
    alert("You must enter player names to start!");
  } else {
    addXandOListener();
    addResetListener();
  }
}

function addXandOListener() {
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].addEventListener("click", addXorO);
  }
}

function addXorO(event) {
  if (event.target.innerHTML.length === 0) {
    if (counter % 2 === 0) {
      OMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "O";
      event.target.setAttribute("class", "O");
      turnText.innerHTML = `It is ${player1}'s turn`;
      counter++;
      checkForWin(OMoves, player2);
    } else {
      XMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "X";
      event.target.setAttribute("class", "X");
      turnText.innerHTML = `It is ${player2}'s turn`;
      counter++;
      checkForWin(XMoves, player1);
    }
    // if the counter is greater than or equal to 10, the game is a draw!
    if (counter >= 10) {
      turnText.innerHTML = "Game Over!";
      document.getElementById("message").innerHTML = "It's a tie, play again?";
      resetBoard();
    }
  }
}

function addResetListener() {
  var resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetBoard);
}

function checkForWin(movesArray, name) {
  // loop over the first array of winning combinations
  for (i = 0; i < winningCombinations.length; i++) {
    // reset the winCounter each time!
    winCounter = 0;
    // loop over each individual array
    for (var j = 0; j < winningCombinations[i].length; j++) {
      // if the number in winning combo array is === a number in moves array, add to winCounter
      if (movesArray.indexOf(winningCombinations[i][j]) !== -1) {
        winCounter++;
      }
      // if winCounter === 3 that means all 3 moves are winning combos and game is over!
      if (winCounter === 3) {
        document.getElementById("message").innerHTML =
          "Game over, " + name + " wins!";
        resetBoard();
      }
    }
  }
}

function resetBoard() {
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("class", "clear");
  }

  let fieldsToClear = document.getElementsByClassName("input");
  for (let i = 0; i < fieldsToClear.length; i++) {
    fieldsToClear[i].value = "";
  }
  player1 = "";
  player2 = "";
  OMoves = [];
  XMoves = [];
  winCounter = 0;
  counter = 1;
  turnText.innerHTML = `New game! Let's go!`;
  start();
}
