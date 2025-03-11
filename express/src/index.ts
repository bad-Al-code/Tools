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

app.get('/', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM dashboard_data');
        res.render('index', { data: rows });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
