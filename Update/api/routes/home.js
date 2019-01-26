const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

//handles completed typing tests at the homepage
router.post('/', homeController.update_misspelled);

module.exports = router;