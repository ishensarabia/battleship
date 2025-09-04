import Ship from './Ship.js';

const numberOfRows = 10;
const numberOfCols = 10;

class Gameboard {
  constructor() {
    this.board = [];
    this.missedAttacks = [];
    this.ships = [];
    this.initializeBoard();
  }

  initializeBoard() {
    for (let i = 0; i < numberOfRows; i++) {
        this.board[i] = new Array(numberOfCols).fill(null);
    }
  }

  getBoard() {
    return this.board;
  }

  placeShip(ship, row, col, orientation) {
    // Check if placement is valid
    if (orientation === 'horizontal') {
      if (col + ship.length > numberOfCols) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    } else { // vertical
      if (row + ship.length > numberOfRows) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    if (row < 0 || row >= numberOfRows || col < 0 || col >= numberOfCols) {
        // out of bounds, should not happen with proper UI
        return 'miss';
    }

    const target = this.board[row][col];

    if (target && target.hit) {
        if (!target.hits.some(h => h[0] === row && h[1] === col)) {
            target.hit([row, col]);
            if (target.isSunk()) {
                return 'sunk';
            }
            return 'hit';
        }
    }

    if (!this.missedAttacks.some(m => m[0] === row && m[1] === col)) {
        this.missedAttacks.push([row, col]);
    }
    return 'miss';
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

export default Gameboard;