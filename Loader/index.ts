import { stdout } from 'node:process';

class TerminalLoader {
    private frames: string[];
    private currentFrameIndex: number;

    constructor() {
        this.frames = ['⠎', '⠓', '⠒', '⠊', '⠉', '⠁'];
        this.currentFrameIndex = 0;
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
