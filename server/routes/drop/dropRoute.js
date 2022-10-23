const express = require('express');
const router = express.Router();

const { getDrop, getDrops, createDrop } = require('../../controllers/drop/dropController');

router.get('/', getDrops);

router.get('/:id', getDrop);

router.post('/', createDrop);

module.exports = router;