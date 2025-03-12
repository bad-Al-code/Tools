import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error(
        'Invalid environment variables: ',
        env.error.flatten().fieldErrors,
    );

    throw new Error('Invalid environment variables');
}

export const envVariables = env.data;
