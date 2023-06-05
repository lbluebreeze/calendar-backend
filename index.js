const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');

// Server startup
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Public dir
app.use(express.static('public'));

// Body JSON parsing
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/event'));

app.get('*', (_, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Listen port
app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto :${process.env.PORT}`);
});