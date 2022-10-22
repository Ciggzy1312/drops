const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    console.log("Registering user...");
});

router.post('/login', (req, res) => {
    console.log("Logging in user...");
});

router.post('/logout', (req, res) => {
    console.log("Logging out user...");
});

module.exports = router;