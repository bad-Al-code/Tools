let mediaRecorder;
let recorededBlobs;

const startRecording = () => {
    if (!stream) {
        alert('No current feed');
        return;
    }
    recorededBlobs = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        console.log('data is availbale');
        recorededBlobs.push(e.data);
    };

    mediaRecorder.start();

    changeButtons([
        'green',
        'green',
        'blue',
        'blue',
        'green',
        'blue',
        'grey',
        'blue',
    ]);
};

const stopRecording = () => {
    if (!mediaRecorder) {
        alert('Please record before stopping');
        return;
    }
    mediaRecorder.stop();

    changeButtons([
        'green',
        'green',
        'blue',
        'blue',
        'green',
        'green',
        'blue',
        'blue',
    ]);
};

const playRecording = () => {
    if (!recorededBlobs) {
        alert('No recording found');
        return;
    }
    const superBuffer = new Blob(recorededBlobs);
    const recorededVideoEl = document.querySelector('#other-video');
    recorededVideoEl.src = window.URL.createObjectURL(superBuffer);
    recorededVideoEl.controls = true;
    recorededVideoEl.play();

    changeButtons([
        'green',
        'green',
        'blue',
        'blue',
        'green',
        'green',
        'green',
        'blue',
    ]);
};
