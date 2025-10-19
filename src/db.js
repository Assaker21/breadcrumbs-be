import pg, { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Client({
  connectionString: process.env.DB_URL,
});
export default pool;
