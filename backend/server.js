import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:https';
import fs from 'node:fs';

const PORT = process.env.PORT;

const AUTH_OPTIONS = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
};

function veriifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, veriifyCallback));

/** Save the sesstion to the cookie */
passport.serializeUser((user, done) => {
    done(null, user);
});

/** Read the session from cookie */
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(
    cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
        secure: true,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
    // TODO:
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'Log In',
        });
    }

    next();
}

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    }),
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
    }),
);

app.get('/auth/logout', (req, res) => {});

app.get('/secret', checkLoggedIn, (req, res) => {
    res.send('SECRET: 021983');
});

app.get('/failure', (req, res) => {
    res.json({ error: 'Failed to log in!' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Genereate  the certificate and key {COPIED FROM NODE HTTPS DOCS}
 *
 * openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout key.pem -out cert.pem
 */
const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
