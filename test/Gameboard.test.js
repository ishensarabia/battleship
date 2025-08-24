import Gameboard from '../src/Gameboard';

describe('Gameboard', () => {
    it('should create a gameboard instance', () => {
        const gameboard = new Gameboard();
        expect(gameboard).toBeDefined();
    });

    it('should place a ship on the gameboard', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip(1, 1, 3, 'horizontal'); // Adjust parameters as necessary
        expect(gameboard.ships.length).toBe(1);
    });

    it('should receive a hit on the ship', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip(1, 1, 3, 'horizontal');
        gameboard.receiveAttack(1, 1);
        expect(gameboard.ships[0].hits).toContainEqual([1, 1]);
    });
});