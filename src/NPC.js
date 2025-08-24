import Gameboard from './Gameboard';

class NPC {
    constructor(gameboard = new Gameboard()) {
        this.gameboard = gameboard;
    }
}

export default NPC;