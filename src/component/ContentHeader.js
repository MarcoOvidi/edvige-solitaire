import {initAbsolute, setCenterFlexLayout, setStyle} from "../util/setStyle"

function ContentHeader() {
    const _this = this; //contesto
    init();

    function init() {
        const divPlayers = document.createElement('div');
        divPlayers.setAttribute('id', 'players-content');
        initAbsolute(divPlayers, ['top', 'right', 'left']);
        setStyle(divPlayers, styles.STYLE_HEADER);

        // creo le due colonne dei 2 giocatori
        const players = ['Dealer', 'Player'];
        players.map(p => {
            const playerText = document.createElement('div');
            playerText.style.fontSize = 'larger';
            setCenterFlexLayout(playerText);
            playerText.innerHTML = p;

            divPlayers.appendChild(playerText);
        });

        _this.element = divPlayers;
    }
}

const styles = {
    STYLE_HEADER: {
        height: '20%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
    }
};

export default ContentHeader;
