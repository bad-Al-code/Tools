import { stdout } from 'node:process';

type LoaderOptions = {
    frames?: string[];
    interval?: number;
    text?: string;
};

class TerminalLoader {
    private frames: string[];
    private currentFrameIndex: number;
    private timer: NodeJS.Timeout | null = null;
    private text: string;
    private interval: number;

    constructor(options: LoaderOptions = {}) {
        this.frames = ['⠎', '⠓', '⠒', '⠊', '⠉', '⠁'];
        this.currentFrameIndex = 0;
        this.text = options.text || 'Loading';
        this.interval = options.interval || 100;
    }

    start(interval: number = 100): NodeJS.Timeout {
        const renderInterval = setInterval(() => {
            this.render();
        }, interval);

        return renderInterval;
    }

    stop(timer: NodeJS.Timeout, finalMessage: string = 'Complete'): void {
        clearInterval(timer);
        this.clearLine();
        stdout.write(finalMessage + '\n');
    }

    private clearLine(): void {
        stdout.clearLine(0);
        stdout.cursorTo(0);
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
