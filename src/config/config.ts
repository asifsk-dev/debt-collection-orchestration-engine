import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from './env';

const config = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME + '_test',
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME + '_prod',
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
  },
};

export default config;