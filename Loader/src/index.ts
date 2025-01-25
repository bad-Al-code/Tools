import TerminalLoader from './loader/TerminalLoader';

async function simulateAsyncTasks() {
    console.log('Scenario 1: Successful Task');
    const loader1 = new TerminalLoader({
        text: 'Processing Data',
        interval: 150,
    });

    loader1.start();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    loader1.stop('success');

    console.log('\nScenario 2: Error Task');
    const loader2 = new TerminalLoader({
        text: 'Downloading',
        frames: ['🌍', '🌎', '🌏'],
    });

    loader2.start();
    await new Promise((_, reject) => setTimeout(() => reject(), 2000));
    try {
        loader2.stop('error');
    } catch {
        console.error('Task failed unexpectedly');
    }

    console.log('\nScenario 3: Multiple Tasks');
    const tasks = [
        { text: 'Uploading', duration: 1500 },
        { text: 'Syncing', duration: 2000 },
        { text: 'Verifying', duration: 2500 },
    ];

    for (const task of tasks) {
        const loader = new TerminalLoader({ text: task.text });
        loader.start();
        await new Promise((resolve) => setTimeout(resolve, task.duration));
        loader.stop('success');
    }
}

simulateAsyncTasks().catch(console.error);
