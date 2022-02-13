import {SUITS, VALUES} from "../const/constants"
import Card from "./Card";


function Deck() {
    const _this = this; // contesto

    init();

    // ho bisogno di passargli il this del mio oggetto
    function init() {
        let cards = [];

        //per ogni seme e per ogni valore carico un oggetto Card
        SUITS.forEach(suit => {
            VALUES.forEach(value => {
                 cards.push(new Card(suit, value));
            });
        });

        _this.cards = cards;
    }

    // mischia il mazzo - con arrow function eredito il this automaticamente
    this.shuffle = () => {
        if (this.cards) {
            //console.log("CARTE DISPONIBILI:" + this.cards.length)
            //mischio tutte le carte in ordine casuale
            for (let i = 0; i < this.cards.length; i++) {
                const newIndex = Math.floor(Math.random() * (i + 1));
                const oldValue = this.cards[newIndex];
                this.cards[newIndex] = this.cards[i];
                this.cards[i] = oldValue;
            }

            //creo 10 mazzetti di 4 carte
            this.mazzetti = [];
            for(let m = 0; m<10; m++) {
                let mazzetto = [];
                for(let c = 0; c<4; c++) {
                    mazzetto[c] = this.cards.pop();
                }
                this.mazzetti[m] = mazzetto;
            }

            //console.log("RIMANENZA:" + this.cards.length)
        }
    };

    this.hitDalMazzetto = (mazzetto) => {
        return this.mazzetti[mazzetto].length > 0 ? this.mazzetti[mazzetto].pop(): null;
    };


}

export default Deck;
