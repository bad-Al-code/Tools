import { stdout } from 'node:process';

class TerminalLoader {
    private frames: string[];
    private currentFrameIndex: number;

    constructor() {
        this.frames = ['⠎', '⠓', '⠒', '⠊', '⠉', '⠁'];
        this.currentFrameIndex = 0;
    }

    start(interval: number = 100): NodeJS.Timeout {
        const renderInterval = setInterval(() => {
            this.render();
        }, interval);

        return renderInterval;
    }

    render(): void {
        const frame = this.frames[this.currentFrameIndex];
        stdout.clearLine(0);
        stdout.cursorTo(0);
        stdout.write(frame);

        this.currentFrameIndex =
            (this.currentFrameIndex + 1) % this.frames.length;
    }
}

export default TerminalLoader;
