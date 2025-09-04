import Player from './Player.js';
import NPC from './NPC.js';
import Ship from './Ship.js';

class Game {
    constructor(gameMode = 'single') {
        this.gameMode = gameMode;
        this.player1 = new Player('Player 1');
        this.player2 = null;
        this.npc = null;
        this.playerTurn = true; // true for player1, false for player2/npc
        this.gameOver = false;

        if (gameMode === 'single') {
            this.npc = new NPC();
            this.setupBoards(this.player1.gameboard, this.npc.gameboard);
        } else {
            this.player2 = new Player('Player 2');
            this.setupBoards(this.player1.gameboard, this.player2.gameboard);
        }
    }

    setupBoards(board1, board2) {
        this.placeShipsRandomly(board1);
        this.placeShipsRandomly(board2);
    }

    placeShipsRandomly(gameboard) {
        const shipLengths = [5, 4, 3, 3, 2];
        shipLengths.forEach(length => {
            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                const ship = new Ship(`ship-${length}`, length);
                placed = gameboard.placeShip(ship, row, col, orientation);
            }
        });
    }

    switchTurn() {
        this.playerTurn = !this.playerTurn;
    }

    playTurn(row, col) {
        if (this.gameOver) return;

        const opponentBoard = this.getOpponentBoard();
        const result = opponentBoard.receiveAttack(row, col);

        if (opponentBoard.allShipsSunk()) {
            this.gameOver = true;
            return;
        }

        if (result === 'miss') {
            this.switchTurn();
            if (this.gameMode === 'single' && !this.playerTurn) {
                this.npcPlay();
            }
        }
    }

    getOpponentBoard() {
        if (this.gameMode === 'single') {
            return this.playerTurn ? this.npc.gameboard : this.player1.gameboard;
        } else {
            return this.playerTurn ? this.player2.gameboard : this.player1.gameboard;
        }
    }

    npcPlay() {
        if (this.gameOver || this.gameMode !== 'single') return;
        let row, col;
        let validAttack = false;
        while(!validAttack) {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            const target = this.player1.gameboard.board[row][col];
            if (!target || !target.hits || !target.hits.some(h => h[0] === row && h[1] === col)) {
                if(!this.player1.gameboard.missedAttacks.some(m => m[0] === row && m[1] === col)) {
                    validAttack = true;
                }
            }
        }

        this.playTurn(row, col);
    }
}

export default Game;
