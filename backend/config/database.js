const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool to PostgreSQL
// Using a pool allows multiple database connections to be reused
// instead of creating a new connection for each query
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Query helper - cleaner than using pool.query directly in every endpoint
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
  pool,
};
