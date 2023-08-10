
const express = require('express');
const app = express();
const connectDB = require('./db');

require('dotenv').config()

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.use('/api/auth', require('./api/auth'));
app.use('/api/task', require('./api/task'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on the port ${port}`);
});
