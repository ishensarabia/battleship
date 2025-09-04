import Player from '../src/Player.js';
import Gameboard from '../src/Gameboard.js';

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player('John');
    });

    it('should create a player instance', () => {
        expect(player).toBeDefined();
    });

    it('should have the correct name', () => {
        expect(player.name).toBe('John');
    });

    it('should have a gameboard', () => {
        expect(player.gameboard).toBeInstanceOf(Gameboard);
    });
});