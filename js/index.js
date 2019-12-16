//module
const gameBoard = (() =>{
    const boardArr = [];

    for(let i=0; i<9; i++){
        boardArr[i] = document.querySelector(`.cell-${i+1}`);
    }

return {boardArr};

})();

const players = (name, score, symbol) => {
    return {name: name, score: score, symbol: symbol};
}

const gamePlay = (playerTurn) => {
    return {playerTurn: playerTurn};
}



//store gameboard as an array
