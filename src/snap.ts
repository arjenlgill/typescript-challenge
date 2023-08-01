import Card from './card';
import Hand from './hand';
import Player from './player';
import shuffle from './helpers/shuffle';

export default class Snap {
    private players: Array<Player> = [];
    private deck: Array<Card> = [];
    private table: Array<Card> = [];

    constructor (private playersQuantity: number, private deckQuantity: number, private roundsQuantity: number) {
        for (let i = 1; i <= playersQuantity; i++) {
          this.players.push(new Player(`Player ${i}`));
        }
        
        this.initDeck(this.deckQuantity);
        this.shuffleDeck();
        this.dealCards();
        this.play();
    }

    private initDeck(deckQuantity: number): void {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]; // got these lists from https://boardgamegeek.com/wiki/page/standard_deck_playing_card_games

        const cards: Array<Card> = [];
        suits.forEach((suit) => {
          faces.forEach((face) => {
            cards.push(new Card(face, suit));
          });
        });
    
        this.deck = cards;
    };

    private shuffleDeck(): void {
        shuffle(this.deck); // details of Fisher-Yates algorithm are not necessary for understanding this program, so it has been abstracted away. 
    };

    private dealCards(): void {
      const totalCards = this.deck.length;
      const remainingCards = totalCards % this.players.length;
    
      let currentPlayerIndex = 0;
      while (this.deck.length > 0) {
        const currentCard = this.deck.pop();
        if (!currentCard) break;
    
        const currentPlayer = this.players[currentPlayerIndex];
        currentPlayer.hand.assignCard(currentCard);
    
        currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
      }
    
      for (let i = 0; i < remainingCards; i++) {
        this.table.push(this.deck.pop()!);
      }
    }    

      private play() { 
        // TODO: logic isn't fully working right now (specifically why we still have full hands after the while loop concludes); need more time to debug and re-think the implementation.
        // - I would begin with logging outputs, and then work through them. 
        // - Then I would feed this debugging process into a test so that it can be replicated in future.
        // - Can also check SO to see if I can speed up the process from an existing solution.
        let round = 1;
        let currentPlayerIndex = 0;
        let matches = 0;
      
        while (round <= this.roundsQuantity) {
          const currentPlayer = this.players[currentPlayerIndex];
      
          const card = currentPlayer.hand.getCards()[0] || null;
      
          if (!card) {
            continue;
          }
      
          currentPlayer.hand.removeCard(card);
          this.table.push(card); // we are mutating the original table array, but in an OOP setting: it's not as consequential as in an FP setting -- so long as we have strictly controlled access to our Snap class.
      
          if (this.table.length > 1) {
            const lastCard = this.table[this.table.length - 1];
            const secondLastCard = this.table[this.table.length - 2];
      
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
      
        for (const player of this.players) {
          console.log(`${player.name}'s hand:`, player.hand.getCards());
        }
      }      

}