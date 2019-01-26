const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

//home page
router.get('/populate', homeController.populate_words);

module.exports = router;