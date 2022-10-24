const express = require('express');
const router = express.Router();

const { getDrop, getDrops, createDrop, updateDrop, deleteDrop } = require('../../controllers/drop/dropController');
const protect = require('../../middlewares/auth/authMiddleware');

router.get('/', protect, getDrops);

router.get('/:id', protect, getDrop);

router.post('/', protect, createDrop);

router.patch('/:id', protect, updateDrop);

router.delete('/:id', protect, deleteDrop);

module.exports = router;