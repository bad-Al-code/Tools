import 'dotenv/config';

import path from 'node:path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import pool from './db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
