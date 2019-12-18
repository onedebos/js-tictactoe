// window.onload = start;

// var turnText = document.querySelector(".playerTurn");

// function addResetListener() {
//   var resetButton = document.getElementById("reset");
//   resetButton.addEventListener("click", resetBoard);
// }
const addXorO = (event) => {
  let counter = 1;

  let OMoves = [];
  let XMoves = [];
  if (event.target.innerHTML.length === 0) {
    if (counter % 2 === 0) {
      OMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "O";
      event.target.setAttribute("class", "O");
      turnText.innerHTML = `It is ${p1.name}'s turn`;
      counter++;
      gameBoard.checkForWin(OMoves, p2.name);
    } else {
      XMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "X";
      event.target.setAttribute("class", "X");
      turnText.innerHTML = `It is ${p2.name}'s turn`;
      counter++;
      gameBoard.checkForWin(XMoves, p1.name);
    }
    // if the counter is greater than or equal to 10, the game is a draw!
    if (counter >= 10) {
      // turnText.innerHTML = "Game Over!";
      document.getElementById("message").innerHTML =
        "It's a tie, play again?";
      // resetBoard();
    }
  }
};

//gameplay
const game = () => {
  const form = document.querySelector(".form");
  let boxes = document.getElementsByTagName("td");
  let p1, p2;
  let turnText = document.querySelector(".turn-text");

  const start = () => {
    let getPlayerNames = () => {
      let player1 = document.getElementById("name-1").value;
      let player2 = document.getElementById("name-2").value;

      if (player1 !== "" && player2 !== "") {
        p1 = Player(player1, "X");
        p2 = Player(player2, "O");
        gameBoard.showBoard();
        runGame.hideForm();
        runGame.addXandOListener();
        runGame.addXorO('click');
      } else {
        const formContainer = document.querySelector(".box");
        const div = document.createElement("div");
        div.classList.add("notification");
        div.classList.add("is-danger");
        div.innerHTML = `Enter player names to start game`;
        formContainer.appendChild(div);
        setTimeout(
          () => document.querySelector(".notification").remove(),
          3000
        );
      }
    };

    gameBoard.hideBoard();
    runGame.showForm();
    const startButton = document.querySelector(".start-now");
    startButton.addEventListener("click", getPlayerNames);
  };

  const showForm = () => {
    form.classList.add("show");
  };

  const hideForm = () => {
    form.style.display = "none";
  };

  //listen for click events on the board
  const addXandOListener = () => {
    for (let i = boxes.length - 1; i >= 0; i--) {
      boxes[i].addEventListener("click", addXorO);
    }
  };

  //add X or O to the board
  

  return { showForm, hideForm, start, addXandOListener };
};

//gameboard
const gameBoard = (() => {
  let winCounter = 0;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkForWin = (movesArray, name) => {
    // loop over the first array of winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
      // reset the winCounter each time!
      winCounter = 0;
      // loop over each individual array
      for (let j = 0; j < winningCombinations[i].length; j++) {
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
  };

  let board = document.querySelector(".game-board");
  const hideBoard = () => {
    board.classList.add("hide");
  };
  const showBoard = () => {
    board.classList.remove("hide");
  };

  const resetBoard = () => {
    // for (var i = boxes.length - 1; i >= 0; i--) {
    //   boxes[i].innerHTML = "";
    //   boxes[i].setAttribute("class", "clear");
    // }
    // //reset input fields
    // let fieldsToClear = document.getElementsByClassName("input");
    // for (let i = 0; i < fieldsToClear.length; i++) {
    //   fieldsToClear[i].value = "";
    // }
    // player1 = "";
    // player2 = "";
    // OMoves = [];
    // XMoves = [];
    // winCounter = 0;
    // counter = 1;
    // turnText.innerHTML = `New game! Let's go!`;
    // start();
  };
  return { hideBoard, resetBoard, showBoard, checkForWin };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

//gameplay
const runGame = game();
runGame.start();
// gameBoard.showBoard;
