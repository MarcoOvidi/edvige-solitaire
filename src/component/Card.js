import backCard from "../asset/cards/back.jpg";
import { bindCard } from "../util/CardImageUtility";
import {setCenterFlexLayout, setStyle} from "../util/setStyle"

export default function Card(suit, value) {
    const _this = this;

    init();

    function init() {
        _this.value = value;
        _this.suit = suit;
        _this.view = buildCardView();
    }

    function buildCardView() {
        const cardView = document.createElement('img');
        cardView.src = bindCard(_this);
        return cardView;
    }


}

// deck di due carte coperte
export function createBackDeckCard(cardType, number) {
    const cardsDiv = document.createElement('div');
    cardsDiv.setAttribute('id', `deck-${cardType}`);

    /*
    const appoggio = document.createElement('div');
    appoggio.setAttribute('id',`appoggio-${cardType}`);
    appoggio.style.marginRight = '-80px';
    cardsDiv.appendChild(appoggio);
*/
    setCenterFlexLayout(cardsDiv);

    for (let i = 0; i<number; i++) {
        if(cardType === 10 && i>=3) {
            break;
        }
        const backCard = buildBackCard(`card-${cardType}-${i}`);
        backCard.style.marginLeft = i !== 0 ? '-90px' : '0px';
        cardsDiv.appendChild(backCard);
    }

    return cardsDiv;
}

// carta coperta singola
function buildBackCard(id) {
    const card = document.createElement('img');
    card.setAttribute('id', id); // assegno a ogni carta un'id
    card.style.height = '150px';
    card.src = backCard;

    return card;
}


