import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSOWRD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});
export default pool;
