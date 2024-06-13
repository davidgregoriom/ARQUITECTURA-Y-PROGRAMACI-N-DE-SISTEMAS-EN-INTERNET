import { Database, MySQLConnector } from "https://deno.land/x/denodb/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts"

const { DB_NAME, DB_HOST, DB_USER, DB_PASS,  DB_PORT } = config();

const connector = new MySQLConnector({
  database: DB_NAME,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  port: parseInt(DB_PORT)
});

export const db = new Database(connector);
