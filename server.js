require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.listen(port, () => console.log(`App listening on ${port}`));

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

const driverRouter = require('./routes/drivers');
app.use('/drivers', driverRouter);

const teamRouter = require('./routes/teams');
app.use('/teams', teamRouter);