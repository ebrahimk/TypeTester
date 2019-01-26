const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');

//handle requests from the home page to the login page
router.get('/', profileController.login);

module.exports = router;