import { Server } from 'socket.io';
import express from 'express';

import https from 'node:https';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname)));

const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const expressServer = https.createServer(
    {
        key,
        cert,
    },
    app,
);
const io = new Server(expressServer);

expressServer.listen(4000);
io.on('connection', (socket) => {
    console.log('Socket Connected');
});
