"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hand = /** @class */ (function () {
    function Hand() {
        this.cards = []; // enforcing encapsulation principle, by avoiding exposure of unecessary details of a class; instead, we are controlling access through defined public methods to perform common game operations.
    }
    Hand.prototype.assignCard = function (card) {
        this.cards = __spreadArray(__spreadArray([], this.cards, true), [card], false); // could also use push() here, and while there is the danger of mutability by doing so: in this case, it's not going to be harmful because we've kept our cards member private.
    };
    ;
    Hand.prototype.removeCard = function (card) {
        this.cards = __spreadArray([], this.cards.filter(function (c) { return c.face !== card.face || c.suit !== card.suit; }), true); // TODO: need to add option to configure face-matching and/or suit-matching
    };
    Hand.prototype.getCardCount = function () {
        return this.cards.length + 1;
    };
    Hand.prototype.getCards = function () {
        return this.cards;
    };
    return Hand;
}());
exports.default = Hand;
