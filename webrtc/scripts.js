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
    } catch (error) {
        console.log('User decined acces to constraints');
    }
};

const showMyFeed = async () => {
    videoEl.srcObject = stream;
    const tracks = stream.getTracks();
    console.log(tracks);
};

const stopMyFeed = async () => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
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
