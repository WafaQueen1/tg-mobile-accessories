const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'tg_mobile_db',
  max: 10,
  idleTimeoutMillis: 30000
});

// Polyfill execute method to mimic mysql2's behavior so we don't have to change every single query logic
// PG returns result.rows instead of an array [rows, fields] like MySQL does.
// By adding a custom execute function, we map it automatically.
pool.execute = async (query, params) => {
    const res = await pool.query(query, params);
    return [res.rows, res.fields];
};

pool.connect()
    .then((client) => {
        console.log('✅ PostgreSQL Connected to tg_mobile_db');
        client.release();
    })
    .catch((err) => {
        console.error('❌ PostgreSQL Connection Error:', err.message);
    });

module.exports = pool;
