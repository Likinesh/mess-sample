import dotenv from 'dotenv'
dotenv.config()
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: process.env.DATABASE_CONNECTION_LIMIT,
});

pool.connect((err) => {
  if (err) {
      console.error('Connection error', err.stack);
  } else {
      console.log('Connected to the database');
  }
});
process.on('SIGINT', () => {
  pool.end(() => {
      console.log('Client disconnected');
      process.exit(0);
  });
});

export default pool;