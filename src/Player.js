import Gameboard from './Gameboard';

class Player {
    constructor(name, marker, gameboard = new Gameboard()) {
        this.name = name;
        this.marker = marker;
        this.gameboard = gameboard;
    }
}

export default Player;