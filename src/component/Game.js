import {importImagesCard} from "../util/CardImageUtility";
import {setStyle, initAbsolute} from "../util/windows";
import OptionBar from "./OptionBar";
import Content from "./Content";
import GameManager from "./GameManager";

function Game() {
    //Carico tutte le immagini con webpack
    importImagesCard();

    //preparo lo style del body
    setStyle(document.body);

    // finestra principale
    const appContainer = document.createElement('main');
    appContainer.setAttribute('id','main');
    initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);

    // barra in alto
    const optionBar = new OptionBar();
    appContainer.appendChild(optionBar.element);

    // contenuto del gioco
    const content = new Content();
    appContainer.appendChild(content.element);

    // gestore del gioco
    const gameManager = new GameManager();

    // assegno il comportamento al bottone della option bar
    optionBar.handleStart = gameManager.start;

    document.body.appendChild(appContainer);
}

export default Game;