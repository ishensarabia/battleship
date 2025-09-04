import Ship from '../src/Ship.js';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship('Destroyer', 3);
    });

    it('should initialize with the correct length', () => {
        expect(ship.length).toBe(3);
    });

    it('should register hits', () => {
        ship.hit([0, 0]);
        expect(ship.hits).toHaveLength(1);
        expect(ship.hits[0]).toEqual([0, 0]);
    });

    it('should be sunk when all positions are hit', () => {
        ship.hit([0, 0]);
        ship.hit([0, 1]);
        ship.hit([0, 2]);
        expect(ship.isSunk()).toBe(true);
    });

    it('should not be sunk if not all positions are hit', () => {
        ship.hit(0);
        ship.hit(1);
        expect(ship.isSunk()).toBe(false);
    });
});