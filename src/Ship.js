class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit(position) {
    if (!this.hits.some(h => h[0] === position[0] && h[1] === position[1])) {
      this.hits.push(position);
    }
  }

  isSunk() {
    return this.hits.length >= this.length;
  }
}

export default Ship;