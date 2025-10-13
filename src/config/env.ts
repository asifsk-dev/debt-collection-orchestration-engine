import dotenv from "dotenv";
dotenv.config();

// List required env vars and export them directly
const requiredEnv = ['PORT', 'NODE_ENV', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'] as const;

type EnvKey = (typeof requiredEnv)[number];

const env: Record<EnvKey, string> = {} as Record<EnvKey, string>;

for (const key of requiredEnv) {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    env[key] = value;
}

export const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = env;