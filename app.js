const express = require('express');
const { Pool } = require('pg');

const app = express();

// PostgreSQL connection URI
//const connectionString = 'postgresql://node_pg_w9mi_user:z62QJkSrRb1OwbNuCWhyLyyYgksoFtJ6@dpg-ctl2imbv2p9s738csqv0-a.singapore-postgres.render.com/node_pg_w9mi';
const connectionString = 'postgresql://node_pg_w9mi_user:z62QJkSrRb1OwbNuCWhyLyyYgksoFtJ6@dpg-ctl2imbv2p9s738csqv0-a/node_pg_w9mi';
// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Render-hosted PostgreSQL
  },
});

// Middleware to parse JSON
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('hi');
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    res.json({ success: true, time: result.rows[0].current_time });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
