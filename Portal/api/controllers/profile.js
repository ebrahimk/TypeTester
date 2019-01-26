const request = require('request');

//send request for profile information from Read service
exports.login = function (req, res) {
    var context = {};

    console.log("user ID: " + res.locals.user.user_ID);

    const options = {
        url: 'http://' + process.env.READ_IP + ':1339/profile',
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
        console.log("received profile from READ service");
        context = JSON.parse(response.body);
        res.render('account', context);
    });
};