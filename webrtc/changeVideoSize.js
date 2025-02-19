const supportedConstrains = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstrains);

const changeVideoSize = () => {
    stream.getTracks().forEach((track) => {
        const capabilities = track.getCapabilities();
        console.log(capabilities);
    });
};
