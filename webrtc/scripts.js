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

document
    .querySelector('#share')
    .addEventListener('click', (e) => getMicAndCamera(e));
