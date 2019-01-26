const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');
const CheckExists = require('../auth/check-exists');

//handle requests from the home page to the login page
router.get('/', CheckExists, profileController.login);

module.exports = router;