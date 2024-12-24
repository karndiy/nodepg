const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');

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


// Run the `init.sql` file to initialize the database
const initDatabase = async () => {
  try {
    const initSQL = fs.readFileSync('./init.sql', 'utf-8');
    await pool.query(initSQL);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err.stack);
  }
};

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


// Define the `/api/user` route
app.get('/api/user', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   await initDatabase();
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// Start the server
const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  await initDatabase(); // Initialize the database on startup
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
