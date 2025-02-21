import { createServer } from 'node:http';

import { app } from './app.js';

const server = createServer(app);

server.listen(42069, () => {
    console.log(`server listening at port: 42069`);
});
