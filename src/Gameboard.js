import Ship from './Ship';

const numberOfRows = 10;
const numberOfCols = 10;
const numberOfShips = 5;

class Gameboard {
  constructor() {
    this.board = [];
    this.missedAttacks = [];
    this.ships = [];
  }

  addRow(row) {
    this.board.push(row);
  }

  addCol(col) {
    this.board.push(col);
  }

  getBoard() {
    return this.board;
  }

  receiveAttack(position) {
    const [row, col] = position;
    if (this.board[row] && this.board[row][col]) {
      this.board[row][col].hit();
      return true; // Attack was successful
    }
    return false; // Attack missed
  }

  initializeShips() {
    const shipLengths = [5, 4, 3, 3, 2]; // Example ship lengths
    for (let i = 0; i < numberOfShips; i++) {
      const ship = new Ship(`Ship${i + 1}`, shipLengths[i]);
      this.ships.push(ship);
    }
  }

  placeShip(row, col, length, orientation) {
    const ship = new Ship(`Ship${this.ships.length + 1}`, length);
    
    // Initialize board if it's empty
    if (this.board.length === 0) {
      for (let i = 0; i < numberOfRows; i++) {
        this.board[i] = new Array(numberOfCols).fill(null);
      }
    }

    // Check if placement is valid
    if (orientation === 'horizontal') {
      if (col + length > numberOfCols) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
      // Place ship
      for (let i = 0; i < length; i++) {
        this.board[row][col + i] = ship;
      }
    } else {
      if (row + length > numberOfRows) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
      // Place ship
      for (let i = 0; i < length; i++) {
        this.board[row + i][col] = ship;
      }
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    if (!this.board[row] || !this.board[row][col]) {
      this.missedAttacks.push([row, col]);
      return false;
    }

    const ship = this.board[row][col];
    if (ship) {
      ship.hit([row, col]);
      return true;
    }

    this.missedAttacks.push([row, col]);
    return false;
  }
}

export default Gameboard;