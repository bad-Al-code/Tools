import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

export { app };
