import dotenv from "dotenv";
import { Client, Pool } from "pg";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  keepAlive: true,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("[pg] Unexpected idle client error:", err);
});

console.log(process.env.DB_URL);

export default pool;
