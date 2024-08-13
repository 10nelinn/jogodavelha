const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    gameBoard.innerHTML = '';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = `Vez de ${currentPlayer}`;
    
    for (let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(button);
    }
}

function handleCellClick(index) {
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    const buttons = gameBoard.querySelectorAll('button');
    buttons[index].textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
        message.textContent = 'Empate!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Vez de ${currentPlayer}`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => boardState[index] === currentPlayer);
    });
}

resetButton.addEventListener('click', createBoard);

createBoard();
