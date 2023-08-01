import Card from './card';

export default class Hand {
    private cards: Array<Card> = []; // enforcing encapsulation principle, by avoiding exposure of unecessary details of a class; instead, we are controlling access through defined public methods to perform common game operations.

    public assignCard(card: Card): void {
        this.cards = [...this.cards, card]; // could also use push() here, and while there is the danger of mutability by doing so: in this case, it's not going to be harmful because we've kept our cards member private.
    };

    public removeCard(card: Card): void {
        this.cards = [...this.cards.filter(c => c.face !== card.face || c.suit !== card.suit)]; // TODO: need to add option to configure face-matching and/or suit-matching
    }

    public getCardCount(): number {
        return this.cards.length + 1;
    }

    public getCards(): Array<Card> {
        return this.cards;
    }

}