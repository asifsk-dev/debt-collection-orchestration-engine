import { Sequelize } from "sequelize-typescript";
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from './env';

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  logging: false
});

export default sequelize;
