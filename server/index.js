const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const dotenv = require('dotenv').config();

connectDB();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', require('./routes/auth/authRoute'));

app.listen(5000, () => {
    console.log('Listening on 5000....');
});