import Deck from "./Deck";
import {initAbsolute, setCenterFlexLayout, setStyle} from "../util/setStyle";
import {createButton, disableButtons} from "./Button";
import {CARD_VALUE_TO_NUMBER} from "../const/constants";
import loseImg from "../asset/gif/lose.gif";
import winImg from "../asset/gif/win.gif";
import Game from "./Game";


function GameManager() {
    const _this = this;

    let deck;
    let mazzettiSulTavolo;
    let numeroDiEstrazioneDalPozzetto;
    let cartaInMano;

    function normalizeCard(card) {
        card.view.style.marginLeft = '-90px';
        card.view.style.height = '150px';
        card.view.style.zIndex= '1';
        return card;
    }

    this.start = function () {
        console.log('QUI');
        // creo il deck di carte
        deck = new Deck();

        //mischio le carte e organizzo i 9 mazzetti ed il pozzetto
        deck.shuffle();

        getContentElements();

        numeroDiEstrazioneDalPozzetto = 1;

        console.log(mazzettiSulTavolo);

        cartaInMano = deck.hitDalMazzetto(10-1);
        let card = normalizeCard(cartaInMano);
        mazzettiSulTavolo[10].appendChild(card.view);

        let cardValue = CARD_VALUE_TO_NUMBER[cartaInMano.value];

        mazzettiSulTavolo[cardValue].childNodes.forEach(e => {e.style.cursor = 'pointer'; e.addEventListener('click',step);});

    };

    function muoviNelMazzettoCorretto(cartaInMano,mazzettoDestinazione) {
        //sposto la carta dalla sua posizione attuale al mazzetto di destinazione
        mazzettoDestinazione.insertBefore(cartaInMano.view,mazzettoDestinazione.firstChild);
    }

    function step() {
        //recupero il mazzetto in cui finirà la carta che ho in mano
        let mazzettoDestinazione = mazzettiSulTavolo[CARD_VALUE_TO_NUMBER[cartaInMano.value]];

        //sposto la carta dal mazzetto appena individuato a quello di sua proprietà
        muoviNelMazzettoCorretto(cartaInMano, mazzettoDestinazione);

        //ora devo rivelare la prossima carta che pesco dal mazzetto destinazione
        let appenaScoperta = deck.hitDalMazzetto(mazzettoDestinazione.getAttribute('id').split('-')[1]-1);

        if(appenaScoperta) {

            //Preparo graficamente la carta da girare
            let card = normalizeCard(appenaScoperta);

            //tolgo una carta coperta dal mazzetto
            mazzettoDestinazione.lastChild.remove();

            //aggiungo la carta scoperta
            mazzettoDestinazione.appendChild(card.view);


            //disattivo il click sul mazzetto
            mazzettoDestinazione.childNodes.forEach(e => {
                e.style.cursor = 'auto';
                e.removeEventListener('click', step);
            });

            //metto il click sul prossimo mazzetto
            mazzettiSulTavolo[CARD_VALUE_TO_NUMBER[appenaScoperta.value]].childNodes.forEach(e => {
                e.style.cursor = 'pointer';
                e.addEventListener('click', step);
            });

            cartaInMano = appenaScoperta;
        } else {
            esito(CARD_VALUE_TO_NUMBER[cartaInMano.value] != 10);
        }
    }

    function esito(vinto) {
        const containerResult = document.createElement('div');
        setCenterFlexLayout(containerResult);
        containerResult.style.height = '100%';
        containerResult.addEventListener('click',reset);

        const result = document.createElement('img');
        result.setAttribute('id', 'img-result');
        result.src =  vinto ? winImg : loseImg;
        result.style.height = '170px';
        containerResult.appendChild(result);

        let gameWindow = document.getElementById('main');

        while(gameWindow.firstChild) {
            gameWindow.firstChild.remove();
        }

        gameWindow.appendChild(containerResult);
    }

    function reset() {
        document.getElementById('main').firstChild.remove();
        new Game();
    }

    function getContentElements() {
        mazzettiSulTavolo = [];
        for(let i = 1; i<= 10; i++) {
            mazzettiSulTavolo[i] = document.getElementById('deck-'+i);
        }
    }

}

const styles = {
    STYLE_OVERLAP_CARD: {
        height: '250px',
        marginLeft: '-110px'
    }
};

export default GameManager;
