const request = require('request');

//send request to read service
exports.get_leaderboard = function (req, res) {
    var board = {};

    const options = {
        //url: 'http://' + process.env.READ_IP + ':1339/leaderboard',
        url: 'http://read-service:1339/leaderboard',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        }
    };

    //send the request to the delete service to remove the entry
    request(options, function(err, response) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("received leaderboard from READ service");
        board.results = JSON.parse(response.body);
        res.render('leaderboard', board);
    });
};
