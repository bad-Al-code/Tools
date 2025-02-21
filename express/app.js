import express, { json, urlencoded } from 'express';
import helmet from 'helmet';

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

app.use(express.static('public'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.post('/', (req, res) => {
    console.log(req.headers);
    res.json('Test');
});

export { app };
