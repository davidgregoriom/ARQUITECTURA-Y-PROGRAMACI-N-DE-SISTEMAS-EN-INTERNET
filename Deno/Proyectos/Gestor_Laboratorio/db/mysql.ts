import { Database, MySQLConnector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new MySQLConnector({
  database: Deno.env.get('DB_NAME') || 'db_name',
  host: Deno.env.get('DB_HOST') || 'localhost',
  username: Deno.env.get('DB_USER') || 'root',
  password: Deno.env.get('DB_PASS') || '',
  port: parseInt(Deno.env.get('DB_PORT') || '3306'),
});

export const db = new Database(connector);
