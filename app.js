// const { Client } = require('pg');

// // Set up the connection configuration
// const client = new Client({
//   user:  'node_pg_w9mi_user',// 'postgres',
//   host:  'dpg-ctl2imbv2p9s738csqv0-a',// 'localhost',
//   database: 'node_pg_w9mi',//'my_database',
//   password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
//   port: 5432,
// });


// Hostname
// An internal hostname used by your Render services.

// dpg-ctl2imbv2p9s738csqv0-a

// Port
// 5432

// Database
// node_pg_w9mi

// Username
// node_pg_w9mi_user



// Connect to PostgreSQL
// client.connect()
//   .then(() => {
//     console.log("Connected to PostgreSQL database!");
//   })
//   .catch(err => {
//     console.error("Connection error", err.stack);
//   });



  const express = require('express');
const { Pool } = require('pg');

const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT || 5432, // Default port

  user:  'node_pg_w9mi_user',// 'postgres',
  host:  'dpg-ctl2imbv2p9s738csqv0-a',// 'localhost',
  database: 'node_pg_w9mi',//'my_database',
  password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
  port: 5432,
});

// Connect to PostgreSQL
pool.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });



app.use(express.json());

// Test the database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    res.json({ success: true, time: result.rows[0].current_time });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT =  3000; // process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



