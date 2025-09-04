import NPC from '../src/NPC.js';
import Gameboard from '../src/Gameboard.js';

describe('NPC', () => {
    let npc;
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
        npc = new NPC(gameboard);
    });

    it('should create an NPC instance', () => {
        expect(npc).toBeDefined();
    });

    it('should have a gameboard', () => {
        expect(npc.gameboard).toBeDefined();
        expect(npc.gameboard).toBeInstanceOf(Gameboard);
    });

    it('should create its own gameboard if none provided', () => {
        const newNpc = new NPC();
        expect(newNpc.gameboard).toBeDefined();
        expect(newNpc.gameboard).toBeInstanceOf(Gameboard);
    });
});