const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//This route is triggered when the user enters their password and username in an attempt to login from the login page
router.get('/login', userController.enter_credentials);

module.exports = router;