const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//add authentication middleware
const Authenticate = require('../auth/authenticate');
const jwtCookie = require('../auth/JWT-cookie');
const Register = require('../auth/register');
const CheckAuth = require('../auth/check-auth');
const CheckExists = require('../auth/check-exists');

//This route is triggered when the user enters their password and username in an attempt to login from the login page
router.post('/login', CheckAuth, Authenticate, jwtCookie, userController.enter_credentials);
//Authenticate, if authentication works produce and send a JWT token with a cookie to the client, then finally render the view
//utilize middle ware to send JWT token to the client

//This route is triggered when the user enters information into the sign up page
router.post('/signup', Register, jwtCookie, userController.signup);

module.exports = router;