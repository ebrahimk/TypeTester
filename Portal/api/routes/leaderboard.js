const express = require('express');
const router = express.Router();

const leaderboardController = require('../controllers/leaderboard');

//this route handles requests to the leaderboard
router.get('/', leaderboardController.get_leaderboard);

module.exports = router;