
class Gameboard {
  constructor() {
    this.board = [];
    this.missedAttacks = [];
  }

  addRow(row) {
    this.board.push(row);
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
}

export default Gameboard;