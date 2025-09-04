import Game from '../src/Game.js';
import Player from '../src/Player.js';
import NPC from '../src/NPC.js';

describe('Game', () => {
    describe('Single Player Mode', () => {
        let game;

        beforeEach(() => {
            game = new Game('single');
        });

        it('should create a game with a player and an NPC', () => {
            expect(game.player1).toBeInstanceOf(Player);
            expect(game.npc).toBeInstanceOf(NPC);
            expect(game.player2).toBeNull();
        });

        it('should switch turns', () => {
            const initialTurn = game.playerTurn;
            game.switchTurn();
            expect(game.playerTurn).toBe(!initialTurn);
        });

        it('should declare a winner when all ships of a player are sunk', () => {
            game.npc.gameboard.ships.forEach(ship => {
                ship.hits = Array(ship.length).fill(0).map((_, i) => [i, 0]);
            });
            expect(game.npc.gameboard.allShipsSunk()).toBe(true);
        });
    });

    describe('Two Player Mode', () => {
        let game;

        beforeEach(() => {
            game = new Game('twoPlayer');
        });

        it('should create a game with two players', () => {
            expect(game.player1).toBeInstanceOf(Player);
            expect(game.player2).toBeInstanceOf(Player);
            expect(game.npc).toBeNull();
        });

        it('should switch turns between players', () => {
            expect(game.playerTurn).toBe(true); // Player 1 starts
            game.switchTurn();
            expect(game.playerTurn).toBe(false); // Player 2's turn
        });

        it('should declare a winner when all ships of a player are sunk', () => {
            game.player2.gameboard.ships.forEach(ship => {
                ship.hits = Array(ship.length).fill(0).map((_, i) => [i, 0]);
            });
            expect(game.player2.gameboard.allShipsSunk()).toBe(true);
        });
    });
});
