import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5434,
  user: process.env.POSTGRES_USER || 'systemwalls_user',
  password: process.env.POSTGRES_PASSWORD || 'systemwalls_pass',
  database: process.env.POSTGRES_DB || 'systemwalls_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('⚠️ Erro inesperado no pool do PostgreSQL:', err);
});
