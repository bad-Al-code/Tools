const buttonsById = [
    'share',
    'show-video',
    'stop-video',
    'change-size',
    'start-record',
    'stop-record',
    'play-record',
    'share-screen',
];

const buttonEls = buttonsById.map((buttonId) =>
    document.getElementById(buttonId)
);

const changeButtons = (colorsArray) => {
    colorsArray.forEach((color, i) => {
        buttonEls[i].classList.remove('btn-success');
        buttonEls[i].classList.remove('btn-primary');
        buttonEls[i].classList.remove('btn-secondary');
        buttonEls[i].classList.remove('btn-danger');
        if (color === 'green') {
            buttonEls[i].classList.add('btn-success');
        } else if (color === 'blue') {
            buttonEls[i].classList.add('btn-primary');
        } else if (color === 'grey') {
            buttonEls[i].classList.add('btn-secondary');
        } else if (color === 'red') {
            buttonEls[i].classList.add('btn-danger');
        }
    });
};
