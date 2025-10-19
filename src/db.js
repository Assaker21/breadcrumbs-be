import pg from "pg";
const { Pool, Client } = pg;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "breadcrumbs",
});
export default pool;
