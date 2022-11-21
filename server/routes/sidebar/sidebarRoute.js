const express = require('express');
const dropByTags = require('../../controllers/drop/dropByTags');
const router = express.Router();

const mostUpvoted = require('../../controllers/drop/mostUpvoted');
const protect = require('../../middlewares/auth/authMiddleware');

router.get('/', protect, mostUpvoted);

router.post('/:id', protect, dropByTags);

module.exports = router;