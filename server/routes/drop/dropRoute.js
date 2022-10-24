const express = require('express');
const router = express.Router();

const { getDrop, getDrops, createDrop, updateDrop, deleteDrop } = require('../../controllers/drop/dropController');
const { bookmarkDrop } = require('../../controllers/drop/dropBookmark');
const { upvoteDrop } = require('../../controllers/drop/dropUpvote');

const protect = require('../../middlewares/auth/authMiddleware');

router.get('/', protect, getDrops);

router.get('/:id', protect, getDrop);

router.post('/', protect, createDrop);

router.patch('/:id', protect, updateDrop);

router.delete('/:id', protect, deleteDrop);

router.patch('/:id/bookmark', protect, bookmarkDrop);

router.patch('/:id/upvote', protect, upvoteDrop);

module.exports = router;