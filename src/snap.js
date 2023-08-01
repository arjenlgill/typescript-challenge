"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");
var player_1 = require("./player");
var shuffle_1 = require("./helpers/shuffle");
var Snap = /** @class */ (function () {
    function Snap(playersQuantity, deckQuantity, roundsQuantity) {
        this.playersQuantity = playersQuantity;
        this.deckQuantity = deckQuantity;
        this.roundsQuantity = roundsQuantity;
        this.players = [];
        this.deck = [];
        this.table = [];
        for (var i = 1; i <= playersQuantity; i++) {
            this.players.push(new player_1.default("Player ".concat(i)));
        }
        this.initDeck(this.deckQuantity);
        this.shuffleDeck();
        this.dealCards();
        this.play();
    }
    Snap.prototype.initDeck = function (deckQuantity) {
        var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        var faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]; // got these lists from https://boardgamegeek.com/wiki/page/standard_deck_playing_card_games
        var cards = [];
        suits.forEach(function (suit) {
            faces.forEach(function (face) {
                cards.push(new card_1.default(face, suit));
            });
        });
        this.deck = cards;
    };
    ;
    Snap.prototype.shuffleDeck = function () {
        (0, shuffle_1.default)(this.deck); // details of Fisher-Yates algorithm are not necessary for understanding this program, so it has been abstracted away. 
    };
    ;
    Snap.prototype.dealCards = function () {
        this.shuffleDeck();
        var totalCards = this.deck.length;
        var remainingCards = totalCards % this.players.length;
        var currentPlayerIndex = 0;
        while (this.deck.length > 0) {
            var currentCard = this.deck.pop();
            if (!currentCard)
                break;
            var currentPlayer = this.players[currentPlayerIndex];
            currentPlayer.hand.assignCard(currentCard);
            currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
        }
        for (var i = 0; i < remainingCards; i++) {
            this.table.push(this.deck.pop());
        }
    };
    Snap.prototype.play = function () {
        // TODO: logic isn't fully working right now (specifically why we still have full hands after the while loop concludes); need more time to debug and re-think the implementation.
        // - I would begin with logging outputs, and then work through them. 
        // - Then I would feed this debugging process into a test so that it can be replicated in future.
        // - Can also check SO to see if I can speed up the process from an existing solution.
        var round = 1;
        var currentPlayerIndex = 0;
        var matches = 0;
        while (round <= this.roundsQuantity) {
            var currentPlayer = this.players[currentPlayerIndex];
            var card = currentPlayer.hand.getCards()[0] || null;
            if (!card) {
                continue;
            }
            currentPlayer.hand.removeCard(card);
            this.table.push(card); // we are mutating the original table array, but in an OOP setting: it's not as consequential as in an FP setting -- so long as we have strictly controlled access to our Snap class.
            if (this.table.length > 1) {
                var lastCard = this.table[this.table.length - 1];
                var secondLastCard = this.table[this.table.length - 2];
                if (lastCard.face === secondLastCard.face) {
                    currentPlayer.hand.assignCard(this.table[0]);
                    this.table = [];
                    matches++;
                }
            }
            currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
            round++;
        }
        console.log("Game Over");
        console.log("Number of Matches:", matches);
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            console.log("".concat(player.name, "'s hand:"), player.hand.getCards());
        }
    };
    return Snap;
}());
exports.default = Snap;
