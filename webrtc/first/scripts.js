const videoEl = document.querySelector('#my-video');
let stream = null;
let mediaStream = null;
const constraints = {
    audio: true,
    video: true,
};

const getMicAndCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log(stream);

        changeButtons([
            'green',
            'blue',
            'blue',
            'grey',
            'grey',
            'grey',
            'grey',
            'grey',
        ]);
    } catch (err) {
        console.log('User decined acces to constraints');
        console.log(err);
    }
};

const showMyFeed = async () => {
    if (!stream) {
        alert('stream still loading...');
        return;
    }
    videoEl.srcObject = stream;
    const tracks = stream.getTracks();
    console.log(tracks);

    changeButtons([
        'green',
        'green',
        'blue',
        'blue',
        'blue',
        'grey',
        'grey',
        'blue',
    ]);
};

const stopMyFeed = async () => {
    if (!stream) {
        alert('stream still loading...');
        return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });

    changeButtons([
        'blue',
        'grey',
        'grey',
        'grey',
        'grey',
        'grey',
        'grey',
        'grey',
    ]);
};

document
    .querySelector('#share')
    .addEventListener('click', (e) => getMicAndCamera(e));
document
    .querySelector('#show-video')
    .addEventListener('click', (e) => showMyFeed());
document
    .querySelector('#stop-video')
    .addEventListener('click', (e) => stopMyFeed());
document
    .querySelector('#change-size')
    .addEventListener('click', (e) => changeVideoSize(e));
document
    .querySelector('#start-record')
    .addEventListener('click', (e) => startRecording(e));
document
    .querySelector('#stop-record')
    .addEventListener('click', (e) => stopRecording(e));
document
    .querySelector('#play-record')
    .addEventListener('click', (e) => playRecording(e));
document
    .querySelector('#share-screen')
    .addEventListener('click', (e) => shareScreen(e));

document
    .querySelector('#audio-input')
    .addEventListener('change', (e) => changeAudioInput(e));
document
    .querySelector('#audio-output')
    .addEventListener('change', (e) => changeAudioOutput(e));
document
    .querySelector('#video-input')
    .addEventListener('change', (e) => changeVideoInput(e));
