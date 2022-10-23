const express = require('express');
const router = express.Router();

const { getDrop, getDrops, createDrop } = require('../../controllers/drop/dropController');
const protect = require('../../middlewares/auth/authMiddleware');

router.get('/', getDrops);

router.get('/:id', getDrop);

router.post('/', protect, createDrop);

module.exports = router;