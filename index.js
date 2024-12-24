const { Client } = require('pg');

// Set up the connection configuration
const client = new Client({
  user:  'my_database_psk5_user',// 'postgres',
  host:  'dpg-ctl1e3i3esus73ecgro0-a',// 'localhost',
  database: 'my_database_psk5',//'my_database',
  password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
  port: 5432,
});

// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });


