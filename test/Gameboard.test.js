import Gameboard from '../src/Gameboard.js';
import Ship from '../src/Ship.js';

describe('Gameboard', () => {
    it('should create a gameboard instance', () => {
        const gameboard = new Gameboard();
        expect(gameboard).toBeDefined();
    });

    it('should place a ship on the gameboard', () => {
        const gameboard = new Gameboard();
        const ship = new Ship('Test Ship', 3);
        gameboard.placeShip(ship, 1, 1, 'horizontal');
        expect(gameboard.ships.length).toBe(1);
    });

    it('should receive a hit on the ship', () => {
        const gameboard = new Gameboard();
        const ship = new Ship('Test Ship', 3);
        gameboard.placeShip(ship, 1, 1, 'horizontal');
        gameboard.receiveAttack(1, 1);
        expect(gameboard.ships[0].hits).toContainEqual([1, 1]);
    });

    it('should record a missed attack', () => {
        const gameboard = new Gameboard();
        gameboard.receiveAttack(1, 1);
        expect(gameboard.missedAttacks).toContainEqual([1, 1]);
    });

    it('should report all ships sunk', () => {
        const gameboard = new Gameboard();
        const ship = new Ship('Test Ship', 1);
        gameboard.placeShip(ship, 1, 1, 'horizontal');
        gameboard.receiveAttack(1, 1);
        expect(gameboard.allShipsSunk()).toBe(true);
    });
});