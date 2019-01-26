const jwt = require('jsonwebtoken');
const request = require('request');

//makes an HTTP request to the READ service and grabs 300 word tuples.
exports.populate_words = function (req, res) {
    var board = {};
    console.log("making request to read service for word tuples...");

    const options = {
        url: 'http://' + process.env.READ_IP + ':1339/populate',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        }
    };

    //send the request to the delete service to remove the entry
    request(options, function(err, words) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("received words from READ service: ");
        board.results = JSON.parse(words.body);
        res.render('home', board);
    });
};

exports.update_misspelled = function(req, res){
    try {
        jwt.verify(req.cookies.jwt, process.env.JWT_KEY, function (err, decoded) {

            var options = {
                url: 'http://' + process.env.UPDATE_IP +':1340/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8',
                    'user_ID': decoded.user_Id,
                    'wpm' : req.body.wpm,
                    'misspelled': req.body.misspelled
                }
            };

            //send the request to the delete service to remove the entry
            request(options, function (err, response) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Done writing new misspelled tuples");
            });
        });
    }
    catch(e){

        var board = {};
        //send a request to READ service for the leaderboard
        var options = {
            url: 'http://' + process.env.READ_IP + ':1339/populate',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };

        //send the request to the delete service to remove the entry
        request(options, function(err, words) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("received words from READ service: ");
            board.results = JSON.parse(words.body);
            res.render('home', board);
        });
    }
};