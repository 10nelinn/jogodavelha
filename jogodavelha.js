const gameBoard = document.getElementById('game-board');  
# Obtém o elemento do tabuleiro de jogo pelo ID.
const message = document.getElementById('message');        
# Obtém o elemento de mensagem pelo ID.
const resetButton = document.getElementById('reset-button'); 
# Obtém o botão de reinício pelo ID.

let currentPlayer = 'X';  # Define o jogador atual como 'X'.
let boardState = ['', '', '', '', '', '', '', '', ''];  
# Estado inicial do tabuleiro, vazio.
let gameActive = true;  # Controla se o jogo está ativo.

const winningConditions = [  
    # Condições de vitória (combinações de índices que resultam em vitória).
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
    # Limpa o conteúdo do tabuleiro.
    boardState = ['', '', '', '', '', '', '', '', ''];  
        # Reseta o estado do tabuleiro.
    gameActive = true;  
        # Reativa o jogo.
    message.textContent = `Vez de ${currentPlayer}`;  
    # Exibe a mensagem de vez do jogador atual.

    for (let i = 0; i < 9; i++) {  
        # Cria 9 células (botões) para o tabuleiro.
        const button = document.createElement('button');  
        # Cria um botão para cada célula.
        button.addEventListener('click', () => handleCellClick(i));  
        # Adiciona um evento de clique ao botão.
        gameBoard.appendChild(button);  
        # Adiciona o botão ao tabuleiro.
    }
}

function handleCellClick(index) {
    if (boardState[index] !== '' || !gameActive) return;  
        # Impede ações se a célula já estiver preenchida ou o jogo estiver inativo.

    boardState[index] = currentPlayer;  
    # Atualiza o estado do tabuleiro com o jogador atual.
    const buttons = gameBoard.querySelectorAll('button');  
    # Obtém todos os botões do tabuleiro.
    buttons[index].textContent = currentPlayer; 
        # Exibe o símbolo do jogador atual na célula clicada.

    if (checkWin()) {  
        # Verifica se o jogador atual venceu.
        message.textContent = `Jogador ${currentPlayer} venceu!`;  
        # Exibe a mensagem de vitória.
        gameActive = false;  
        # Desativa o jogo.
    } else if (boardState.every(cell => cell !== '')) {  
        # Verifica se todas as células estão preenchidas (empate).
        message.textContent = 'Empate!';  
        # Exibe a mensagem de empate.
        gameActive = false;  
        # Desativa o jogo.
    } else {  
        # Alterna para o próximo jogador.
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
        # Alterna entre 'X' e 'O'.
        message.textContent = `Vez de ${currentPlayer}`;  
        # Exibe a mensagem de vez do próximo jogador.
    }
}

function checkWin() {  
    # Verifica se há uma condição de vitória.
    return winningConditions.some(condition => {
        return condition.every(index => boardState[index] === currentPlayer);  
        # Retorna verdadeiro se todos os índices de uma condição de vitória pertencerem ao jogador atual.
    });
}

resetButton.addEventListener('click', createBoard);  # Reinicia o jogo ao clicar no botão de reinício.

createBoard();  # Inicializa o tabuleiro quando o script é carregado.
