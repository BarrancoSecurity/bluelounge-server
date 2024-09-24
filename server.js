// server.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const morgan = require("morgan");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("common"));
// Define Routes
app.use('/api/services', require('./routes/services'));

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
