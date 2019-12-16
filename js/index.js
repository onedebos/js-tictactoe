const gameBoard = (gameboard) =>{
    return {gameboard: gameboard};
}

const players = (name, score, symbol) => {
    return {name: name, score: score, symbol: symbol};
}

const gamePlay = (playerTurn) => {
    return {playerTurn: playerTurn};
}