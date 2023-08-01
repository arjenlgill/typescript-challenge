"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hand_1 = require("./hand");
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.hand = new hand_1.default();
    }
    return Player;
}());
exports.default = Player;
