const { Client } = require('pg');

// Set up the connection configuration
const client = new Client({
  user:  'node_pg_w9mi_user',// 'postgres',
  host:  'dpg-ctl2imbv2p9s738csqv0-a',// 'localhost',
  database: 'node_pg_w9mi',//'my_database',
  password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
  port: 5432,
});


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
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });


