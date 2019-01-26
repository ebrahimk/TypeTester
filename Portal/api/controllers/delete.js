//const connection = require('../../db');
const jwt = require('jsonwebtoken');
const request = require('request');


exports.delete_profile = function(req, res) {
    jwt.verify(req.cookies.jwt, process.env.JWT_KEY, function (err, decoded) {

        const options = {
            url: 'http://' + process.env.DELETE_IP +':1338/delete',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'user_ID': decoded.user_Id
            }
        };

        //send the request to the delete service to remove the entry
        request(options, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("deleted user with user_ID: " + decoded.user_Id);
        });
        res.render('home');     //render the homepage back to the user

    });
};
