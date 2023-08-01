"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snap_1 = require("./snap");
function testSnapGame() {
    var numPlayers = 2;
    var numDecks = 1;
    var maxRounds = 10;
    var game = new snap_1.default(numPlayers, numDecks, maxRounds);
}
testSnapGame();
