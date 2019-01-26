const request = require('request');

require('dotenv').config();

exports.enter_credentials = function(req, res) {
    var context = {};

    console.log("Sending login request to READ");
    const options = {
        url: 'http://' + process.env.READ_IP + ':1339/user/login',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'user_ID': res.locals.user.user_ID
        }
    };

    //send the request to the delete service to remove the entry
    request(options, function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        context = JSON.parse(response.body);
        console.log("Performing Login with READ service: " + context.username);
        res.render('account', context);
    });
};


exports.signup =function(req, res) {
    var context = {};
    context.username = res.locals.user.username;
    res.render('account', context);
};
