import { Database, MySQLConnector } from 'denodb';



const connector = new MySQLConnector({
  database: Deno.env.get('DB_NAME')?.toString() || 'db_name',
  host: Deno.env.get('DB_HOST')?.toString() || 'localhost',
  username: Deno.env.get('DB_USER')?.toString() || 'root',
  password: Deno.env.get('DB_PASS')?.toString() || '',
  port: parseInt(Deno.env.get('DB_PORT') || '3306'),
});

export const db = new Database(connector);
