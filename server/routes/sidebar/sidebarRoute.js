const express = require('express');
const router = express.Router();

const mostUpvoted = require('../../controllers/drop/mostUpvoted');
const protect = require('../../middlewares/auth/authMiddleware');

router.get('/', protect, mostUpvoted);

module.exports = router;