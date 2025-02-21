import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.post('/', (req, res) => {
    console.log(req.headers);
    res.send('Test');
});

export { app };
