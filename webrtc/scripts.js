const videoEl = document.querySelector('#my-video');
let stream = null;
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
