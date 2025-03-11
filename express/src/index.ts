import 'dotenv/config';

import path from 'node:path';
import { randomUUID } from 'node:crypto';
import express, { Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';

import { initialize } from './config/passport';
initialize(passport, (email: string) =>
    users.find((user) => user.email === email),
);

export interface User {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
}
const users: User[] = [];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(urlencoded({ extended: false }));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    }),
);

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const id = randomUUID();
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        users.push({
            id,
            name,
            email,
            hashedPassword,
        });

        res.redirect('/login');
    } catch (error) {
        res.redirect('/register');
    }

    console.log(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
