export function setStyle(element) {
    const keys = Object.keys(styles.STYLE_BODY);
    keys.forEach(function(key) {
        element.style[key] = styles.STYLE_BODY[key];
    });
}

export function initAbsolute(element, props) {
    element.style.position = 'absolute';
    props.forEach(function(key) {
        element.style[key] = 0;
    });
}

export function setCenterFlexLayout(element) {
    setStyle(element, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });
}

const styles = {
    STYLE_BODY: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#24541A'
    }
};