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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
