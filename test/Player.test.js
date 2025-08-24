import Player from '../src/Player';
import Gameboard from '../src/Gameboard';

describe('Player', () => {
    let player;
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
        player = new Player('Player 1', 'X', gameboard);
    });

    it('should create a Player instance', () => {
        expect(player).toBeDefined();
    });

    it('should have the correct name', () => {
        expect(player.name).toBe('Player 1');
    });

    it('should have the correct marker', () => {
        expect(player.marker).toBe('X');
    });

    it('should have a gameboard', () => {
        expect(player.gameboard).toBeDefined();
        expect(player.gameboard).toBeInstanceOf(Gameboard);
    });

    it('should create its own gameboard if none provided', () => {
        const newPlayer = new Player('Player 2', 'O');
        expect(newPlayer.gameboard).toBeDefined();
        expect(newPlayer.gameboard).toBeInstanceOf(Gameboard);
    });
});