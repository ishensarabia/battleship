import Game from './Game.js';
import './style.css';

let game;

function startGame(mode) {
    document.getElementById('game-mode-selection').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    game = new Game(mode);
    renderBoards();
    updateGameInfo();
}

function renderBoards() {
    const playerBoardElement = document.getElementById('player-board');
    const npcBoardElement = document.getElementById('npc-board');
    playerBoardElement.innerHTML = '';
    npcBoardElement.innerHTML = '';

    if (game.gameMode === 'single') {
        renderBoard(game.player1.gameboard, playerBoardElement, true);
        renderBoard(game.npc.gameboard, npcBoardElement, false);
    } else {
        const currentPlayer = game.playerTurn ? game.player1 : game.player2;
        const opponentPlayer = game.playerTurn ? game.player2 : game.player1;
        document.getElementById('player1-title').textContent = `${currentPlayer.name}'s Board`;
        document.getElementById('player2-title').textContent = `${opponentPlayer.name}'s Board (hidden)`;
        renderBoard(currentPlayer.gameboard, playerBoardElement, true);
        renderBoard(opponentPlayer.gameboard, npcBoardElement, false, true); // hide ships
    }
}

function renderBoard(gameboard, element, isPlayer, hideShips = false) {
    element.classList.add('board');
    element.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const cellState = gameboard.board[i][j];

            if (isPlayer && cellState instanceof Object && !hideShips) {
                cell.classList.add('ship');
            }

            if (gameboard.missedAttacks.some(m => m[0] === i && m[1] === j)) {
                cell.classList.add('miss');
            }

            if (cellState && cellState.hits && cellState.hits.some(h => h[0] === i && h[1] === j)) {
                cell.classList.add('hit');
                if (cellState.isSunk()) {
                    cell.classList.add('sunk');
                }
            }

            if (!isPlayer) {
                cell.addEventListener('click', () => {
                    if (!game.gameOver) {
                        game.playTurn(i, j);
                        if(game.gameMode === 'twoPlayer' && !game.gameOver) {
                            showPassDeviceModal();
                        } else {
                            renderBoards();
                        }
                        updateGameInfo();
                    }
                });
            }
            element.appendChild(cell);
        }
    }
}

function updateGameInfo() {
    const infoElement = document.getElementById('game-info');
    if (game.gameOver) {
        const winner = game.player1.gameboard.allShipsSunk() ? (game.gameMode === 'single' ? 'NPC' : game.player2.name) : game.player1.name;
        showGameOverModal(`${winner} wins!`);
    } else {
        const currentPlayerName = game.playerTurn ? game.player1.name : (game.gameMode === 'single' ? 'NPC' : game.player2.name);
        infoElement.textContent = `${currentPlayerName}'s turn`;
    }
}

function showGameOverModal(message) {
    const modal = document.getElementById('game-over-modal');
    const messageElement = document.getElementById('game-over-message');
    messageElement.textContent = message;
    modal.style.display = 'block';
}

function showPassDeviceModal() {
    const modal = document.getElementById('pass-device-modal');
    const messageElement = document.getElementById('pass-device-message');
    const nextPlayer = game.playerTurn ? game.player1.name : game.player2.name;
    messageElement.textContent = `Pass the device to ${nextPlayer}`;
    modal.style.display = 'block';
}

function restartGame() {
    document.getElementById('game-over-modal').style.display = 'none';
    document.getElementById('game-mode-selection').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('single-player-btn').addEventListener('click', () => startGame('single'));
    document.getElementById('two-player-btn').addEventListener('click', () => startGame('twoPlayer'));
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('continue-btn').addEventListener('click', () => {
        document.getElementById('pass-device-modal').style.display = 'none';
        renderBoards();
    });
});
