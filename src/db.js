import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});
client.connect(); // REQUIRED

export default client;
