import Hand from './hand';

export default class Player {
    public hand: Hand;

    constructor(public name: string) {
        this.hand = new Hand();
    }
}
