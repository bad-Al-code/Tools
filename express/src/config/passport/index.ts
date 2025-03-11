import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { User } from '../..';

type DoneFunction = (
    error: any,
    user?: User | false,
    options?: { message: string },
) => void;

interface AuthenticateUserFunction {
    (email: string, password: string, donw: DoneFunction): void;
}

export function getUserByEmail(email: string): User | null {
    return null;
}

export function initialize(
    passport: PassportStatic,
    getUserByEmail: (email: string) => User | undefined,
) {
    const authenticateUser: AuthenticateUserFunction = async (
        email,
        passport,
        done,
    ) => {
        const user = getUserByEmail(email);

        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            if (await bcrypt.compare(passport, user.hashedPassword)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid Credentials' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser),
    );
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((user, done) => {});
}
