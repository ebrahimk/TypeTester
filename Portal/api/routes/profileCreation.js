const express = require('express');
const router = express.Router();

const profileCreationController = require('../controllers/profileCreation');

//handle requests from the login page to the account creation page
router.get('/', profileCreationController.create_profile);

module.exports = router;