import Ship from '../src/Ship';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship('Destroyer', 3);
    });

    it('should initialize with the correct length', () => {
        expect(ship.length).toBe(3);
    });

    it('should register hits', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    it('should be sunk when all positions are hit', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    it('should not be sunk if not all positions are hit', () => {
        ship.hit(0);
        ship.hit(1);
        expect(ship.isSunk()).toBe(false);
    });
});