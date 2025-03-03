const socket = io.connect('https://localhost:4000/');

const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video');

let localStream;
let remoteStream;
let peerConnection;

let peerConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
            ],
        },
    ],
};

const call = async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

    localVideoEl.srcObject = stream;
    localStream = stream;

    await createPeerConnection();

    try {
        console.log('Creating offer..');
        const offer = await peerConnection.createOffer();
        console.log(offer);
    } catch (err) {
        console.log(err);
    }
};

const createPeerConnection = () => {
    return new Promise(async (resolve, reject) => {
        peerConnection = await new RTCPeerConnection(peerConfiguration);

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.addEventListener('icecandidate', (e) => {
            console.log('.... ICE CANDIDATE FOUND....');
            console.log(e);
        });
        resolve();
    });
};

document.querySelector('#call').addEventListener('click', call);
