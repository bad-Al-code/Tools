let mediaRecorder;
let recorededBlobs;

const startRecording = () => {
    recorededBlobs = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
        console.log('data is availbale');
        recorededBlobs.push(e.data);
    };

    mediaRecorder.start();
};

const stopRecording = () => {
    mediaRecorder.stop();
};

const playRecording = () => {
    const superBuffer = new Blob(recorededBlobs);
    const recorededVideoEl = document.querySelector('#other-video');
    recorededVideoEl.src = window.URL.createObjectURL(superBuffer);
    recorededVideoEl.controls = true;
    recorededVideoEl.play();
};
