const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ message: "Get drops" });
});

router.get('/:id', (req, res) => {
    res.status(200).json({ message: "Get drop by id" });
});

router.post('/', (req, res) => {
    res.status(200).json({ message: "Create drop" });
});

module.exports = router;