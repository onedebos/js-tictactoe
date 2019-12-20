/* eslint-disable radix */
/* eslint-disable no-use-before-define */
//  gameplay
const Game = (p1, p2, turnText, counter, space) => {
  const form = document.querySelector('.form');
  Game.space = document.querySelector('.game-board');

  Game.turnText = document.querySelector('.turn-text');

  const start = () => {
    GameBoard.resetBoard();
    const clearPlayerNames = () => {
      const fieldsToClear = document.getElementsByClassName('input');
      const fieldsArr = [...fieldsToClear];
      fieldsArr.forEach((item) => {
        item.value = '';
      });
    };
    const getPlayerNames = () => {
      const player1 = document.getElementById('name-1').value;
      const player2 = document.getElementById('name-2').value;

      if (player1 !== '' && player2 !== '') {
        Game.p1 = Player(player1, 'X');
        Game.p2 = Player(player2, 'O');
        GameBoard.showBoard();
        runGame.hideForm();
        runGame.addXorO();
        GameBoard.restartBtn();
        clearPlayerNames();
      } else {
        const formContainer = document.querySelector('.box-1');
        const div = document.createElement('div');
        div.classList.add('notification');
        div.classList.add('is-danger');
        div.innerHTML = 'Enter player names to start game';
        formContainer.appendChild(div);
        setTimeout(() => document.querySelector('.notification').remove(), 3000);
      }
    };

    GameBoard.hideBoard();
    runGame.showForm();
    const startButton = document.querySelector('.start-now');
    startButton.addEventListener('click', getPlayerNames);
  };

  const showForm = () => {
    form.classList.add('show');
  };

  const hideForm = () => {
    form.style.display = 'none';
  };

  //  add X or O to the board
  const addXorO = () => {
    Game.counter = 1;
    GameBoard.oMoves = [];
    GameBoard.xMoves = [];

    Game.space.addEventListener('click', (event) => {
      if (event.target.innerHTML.length === 0) {
        if (Game.counter % 2 === 0) {
          GameBoard.oMoves.push(parseInt(event.target.getAttribute('data-num')));
          event.target.innerHTML = 'O';
          event.target.setAttribute('class', 'O');
          Game.turnText.innerHTML = `It is ${Game.p1.getName()}'s turn`;
          Game.counter += 1;
          GameBoard.checkForWin(GameBoard.oMoves, Game.p2.getName(), 'danger');
        } else {
          GameBoard.xMoves.push(parseInt(event.target.getAttribute('data-num')));
          event.target.innerHTML = 'X';
          event.target.setAttribute('class', 'X');
          Game.turnText.innerHTML = `It is ${Game.p2.getName()}'s turn`;
          Game.counter += 1;
          GameBoard.checkForWin(GameBoard.xMoves, Game.p1.getName(), 'warning');
        }
        // if the counter is greater than or equal to 10, the game is a draw!
        if (Game.counter >= 10) {
          Game.turnText.innerHTML = 'It\'s a tie!';
          setTimeout(GameBoard.resetBoard, 1500);
        }
      }
    });
  };

  return {
    showForm,
    hideForm,
    start,
    addXorO,
    p1,
    p2,
    turnText,
    counter,
    space,
  };
};

//  GameBoard
const GameBoard = ((oMoves, xMoves) => {
  let winCounter = 0;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWin = (movesArray, name, color) => {
    // loop over the first array of winning combinations
    for (let i = 0; i < winningCombinations.length; i += 1) {
      // reset the winCounter each time!
      winCounter = 0;
      // loop over each individual array
      for (let j = 0; j < winningCombinations[i].length; j += 1) {
        // if the number in winning combo array is === a number in moves array, add to winCounter
        if (movesArray.indexOf(winningCombinations[i][j]) !== -1) {
          winCounter += 1;
        }
        // if winCounter === 3 that means all 3 moves are winning combos and game is over!
        if (winCounter === 3) {
          // const turnText = document.querySelector('.turn-text');
          Game.turnText.innerHTML = `Game over, ${name} wins!.`;
          Game.turnText.classList.add(`is-${color}`);
          Game.turnText.classList.add('notification');
          setTimeout(GameBoard.resetBoard, 1500);
        }
      }
    }
  };

  const board = document.querySelector('.game-board');
  const resetBtn = document.querySelector('.reset-btn');
  const hideBoard = () => {
    board.classList.add('hide');
    resetBtn.style.display = 'none';
  };
  const showBoard = () => {
    board.classList.remove('hide');
    resetBtn.style.display = 'block';
  };

  const restartBtn = () => {
    resetBtn.addEventListener('click', resetBoard);
  };

  const resetBoard = () => {
    Game.counter = 1;
    Game.turnText.classList.remove('is-danger');
    Game.turnText.classList.remove('notification');
    Game.turnText.innerHTML = 'Let\'s play again!';
    const cells = document.getElementsByTagName('td');
    const cellsArr = [...cells];
    cellsArr.forEach((cell) => {
      cell.innerHTML = '';
      cell.setAttribute('class', 'clear');
    });

    GameBoard.xMoves = [];
    GameBoard.oMoves = [];
    Game.space.removeEventListener('click', () => {});
  };
  return {
    hideBoard,
    resetBoard,
    showBoard,
    checkForWin,
    restartBtn,
    oMoves,
    xMoves,
  };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

//  gameplay
const runGame = Game();
runGame.start();
