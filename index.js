const express = require('express');
const connectDb = require('./config/db');

// initialize app
const app = express();

// connect to database
connectDb();

// accept json data into api
app.use(express.json({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));