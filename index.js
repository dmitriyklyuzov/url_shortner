const express = require('express');

// initialize app
const app = express();

// accept json data into api
app.use(express.json({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));