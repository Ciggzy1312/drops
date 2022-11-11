const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const dotenv = require('dotenv').config();

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use((res, req, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use(cors())

//app.use(cors({ credentials: true, origin: ['https://drops-mauve.vercel.app/', 'http://localhost:3000'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use('/api/auth', require('./routes/auth/authRoute'));
app.use('/api/drop', require('./routes/drop/dropRoute'));

app.listen(5000, () => {
    console.log('Listening on 5000....');
});