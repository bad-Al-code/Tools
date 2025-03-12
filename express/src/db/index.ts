import { drizzle } from 'drizzle-orm/mysql2';
import mysql, { Pool } from 'mysql2/promise';
import { envVariables } from '../config/env';

export class Database {
    private pool: Pool;
    public db: ReturnType<typeof drizzle>;

    constructor() {
        this.pool = mysql.createPool(envVariables.DATABASE_URL);
        this.db = drizzle(this.pool);
    }

    async start(): Promise<void> {
        try {
            await this.pool.getConnection();
            console.log('Database Connection established');
        } catch (error) {
            console.error('Error establishing database connection: ', error);

            throw error;
        }
    }

    async end(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Database connection closed.');
        } catch (error) {
            console.error('Error closing database connection.');

            throw error;
        }
    }
}

const database = new Database();
export const db = database.db;
export const dbInstance = database;
