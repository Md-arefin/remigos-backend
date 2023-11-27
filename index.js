const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.get('/products', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products'); ;
    client.release();
    res.send(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products WHERE id = $1', [productId]);
    res.send(result.rows[0]);
    client.release();
  } catch (error) {
    console.error('Error fetching data by id', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/insert', async (req, res) => {
  const { id, category, name, seller, price, stock, ratings, img, shipping, quantity } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO products(id, category, name, seller, price, stock, ratings, img, shipping, quantity) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [id, category, name, seller, price, stock, ratings, img, shipping, quantity]
    );

    const insertedData = result.rows[0];
    client.release();
    res.status(201).json({ message: 'Data inserted successfully', data: insertedData });
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
