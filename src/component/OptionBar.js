import {initAbsolute, setCenterFlexLayout, setStyle} from "../util/setStyle"
import {createButton} from "./Button";

function OptionBar() {
    const _this = this; // contesto
    let handleStart, handleStop; // comportamento del bottone

    init();
    
    function init() {
        const bar = document.createElement('div');
        bar.setAttribute('id','bar');

        if (bar) {

            // -- Stile --
            bar.setAttribute('id', 'option-bar');
            initAbsolute(bar, ['top', 'right', 'left']);
            setStyle(bar, styles.STYLE_BAR);

            // -- Testo --
            const divContainerText = document.createElement('div');
            setCenterFlexLayout(divContainerText);

            const infoText = document.createElement('h2');
            infoText.setAttribute('id','option-bar-text');
            infoText.innerHTML = 'EDVIGE SOLITAIRE';
            divContainerText.appendChild(infoText);

            bar.appendChild(divContainerText);

            // -- Bottone --
            const divContainerButton = document.createElement('div');
            divContainerButton.setAttribute('id','start-button');
            setCenterFlexLayout(divContainerButton);
            const buttonStart = createButton('START');

            //  -- Comportamento bottone --
            const handleClickStop = () => {
                if (window.intervalDealer) clearInterval(window.intervalDealer);
                buttonStart.removeEventListener('click', handleClickStop);
                buttonStart.innerHTML = 'START';
                if (handleStop) {
                    handleStop();
                }
                buttonStart.addEventListener('click', handleClickStart);
            };

            const handleClickStart = () => {
                buttonStart.removeEventListener('click', handleClickStart);
                buttonStart.innerHTML = 'RESET';
                if (handleStart) {
                    handleStart();
                }
                buttonStart.addEventListener('click', handleClickStop);
            };

            buttonStart.addEventListener('click', handleClickStart); // comportamento di default

            //------

            divContainerButton.appendChild(buttonStart);
            bar.appendChild(divContainerButton);
        }

        _this.element = bar;
    }

    // -- SETTER del comportamento bottone
    Object.defineProperty(this, 'handleStart', {
        set: function(callback) {
            handleStart = callback;
        },
    });
    Object.defineProperty(this, 'handleStop', {
        set: function(callback) {
            handleStop = callback;
        },
    });
}

const styles = {
    STYLE_BAR: {
        height: '25%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
    }
};

export default OptionBar;
