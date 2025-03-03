import express from 'express';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database,
});

await db.exec(`
	CREATE TABLE IF NOT EXISTS messages (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		client_offset TEXT UNIQUE, 
		content TEXT
	)
`);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
    socket.on('chat message', async (msg) => {
        let result;
        try {
            result = await db.run(
                'INSERT INTO MESSAGES (content) VALUES (?)',
                msg,
            );
        } catch (error) {
            return;
        }

        io.emit('chat message', msg, result.lastID);
    });

    if (!socket.recovered) {
        // if the connection state recovery was not successful
        try {
            await db.each(
                'SELECT id, content FROM messages WHERE id > ?',
                [socket.handshake.auth.serverOffset || 0],
                (_err, row) => {
                    socket.emit('chat message', row.content, row.id);
                },
            );
        } catch (e) {
            // something went wrong
        }
    }
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
