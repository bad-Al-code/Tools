const audioInputEl = document.querySelector('#audio-input');
const audioOutputEl = document.querySelector('#audio-output');
const videoInputEl = document.querySelector('#video-input');

const getDevices = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);

        devices.forEach((device) => {
            const options = document.createElement('option');
            options.value = device.deviceId;
            options.text = device.label;

            if (device.kind === 'audioinput') {
                audioInputEl.appendChild(options);
            } else if (device.kind === 'audiooutput') {
                audioOutputEl.appendChild(options);
            } else if (device.kind === 'videoinput') {
                videoInputEl.appendChild(options);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const changeAudioInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio: { exact: deviceId },
        video: true,
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(
            newConstraints
        );
        console.log(stream);

        const tracks = stream.getAudioTracks();
        console.log(tracks);
    } catch (error) {
        console.log(error);
    }
};

const changeAudioOutput = async (e) => {
    await videoEl.setSinkId(e.target.value);
    console.log('Changed audio device!');
};

const changeVideoInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        video: { deviceId: { exact: deviceId } },
        audio: true,
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(
            newConstraints
        );
        console.log(stream);

        const tracks = stream.getVideoTracks();
        console.log(tracks);
    } catch (error) {
        console.log(error);
    }
};

getDevices();
