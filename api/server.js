const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => 
res.send('Hello, Ioana!'));

const friendRoutes = require('./controllers/friend');
app.use('/friend', friendRoutes);

module.exports = app;
