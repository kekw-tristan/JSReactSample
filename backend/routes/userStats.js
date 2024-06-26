const express = require('express');
const { getUserStats } = require('../controllers/userStatsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all user stats routes
router.use(requireAuth);

// GET user statistics
router.get('/', getUserStats);

module.exports = router;
