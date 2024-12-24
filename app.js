const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const { faker } = require('@faker-js/faker'); // Import faker

const app = express();

// PostgreSQL connection URI
const connectionString = 'postgresql://node_pg_w9mi_user:z62QJkSrRb1OwbNuCWhyLyyYgksoFtJ6@dpg-ctl2imbv2p9s738csqv0-a.singapore-postgres.render.com/node_pg_w9mi';
//const connectionString = 'postgresql://node_pg_w9mi_user:z62QJkSrRb1OwbNuCWhyLyyYgksoFtJ6@dpg-ctl2imbv2p9s738csqv0-a/node_pg_w9mi';
//postgresql://node_pg_w9mi_user:z62QJkSrRb1OwbNuCWhyLyyYgksoFtJ6@dpg-ctl2imbv2p9s738csqv0-a.singapore-postgres.render.com/node_pg_w9mi
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

// Add `/api/genuser/:count?` route to generate and insert multiple users (optional count, default is 1)
app.get('/api/genuser/:count?', async (req, res) => {
  const count = parseInt(req.params.count, 10) || 1; // Default to 1 if no count is provided

  try {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = {
        name: faker.person.fullName(), // Generate random full name
        email: faker.internet.email(), // Generate random email
        age: faker.number.int({ min: 18, max: 80 }), // Generate random age between 18 and 80
      };

      const insertQuery = `
        INSERT INTO users (name, email, age)
        VALUES ($1, $2, $3)
        RETURNING *`;

      // Insert each user into the database
      const result = await pool.query(insertQuery, [user.name, user.email, user.age]);
      users.push(result.rows[0]); // Collect the inserted user
    }

    res.json({ success: true, users });
  } catch (err) {
    console.error('Error generating users:', err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// Define the `/api/user` route
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Add /api/grn_product/:count? route to generate and insert multiple products (optional count, default is 1)
app.get('/api/gen_product/:count?', async (req, res) => {
  const count = parseInt(req.params.count, 10) || 1; // Default to 1 if no count is provided

  try {
    const products = [];

    for (let i = 0; i < count; i++) {
      const product = {
        name: faker.commerce.productName(), // Generate random product name
        description: faker.commerce.productDescription(), // Generate random product description
        price: parseFloat(faker.commerce.price()), // Generate random product price
      };

      const insertQuery = `
        INSERT INTO products (name, description, price)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      // Insert each product into the database
      const result = await pool.query(insertQuery, [product.name, product.description, product.price]);
      products.push(result.rows[0]); // Collect the inserted product
    }

    res.json({ success: true, products });
  } catch (err) {
    console.error('Error generating products:', err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});






// Start the server
const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  await initDatabase(); // Initialize the database on startup
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
