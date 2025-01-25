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

    start(): void {
        if (this.timer) {
            console.warn('Loader is already running');
            return;
        }

        this.timer = setInterval(() => {
            this.render();
        }, this.interval);
    }

    stop(status: 'success' | 'error' = 'success'): void {
        if (!this.timer) {
            console.warn('Loader is not running');
            return;
        }

        clearInterval(this.timer);
        this.clearLine();

        const statusMessage =
            status === 'success'
                ? `✓ ${this.text} Complete`
                : `✗ ${this.text} Failed`;

        stdout.write(statusMessage + '\n');
        this.timer = null;
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
