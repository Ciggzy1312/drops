const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(5000, () => {
    console.log('Listening on 5000....');
});