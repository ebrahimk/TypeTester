const connection = require('../../db');

exports.get_leaderboard = function (req, res) {
    var board = {};
    console.log("leaderboard request accepted");
    connection.query("SELECT R.score, R.date_taken, U.username FROM results AS R, user AS U WHERE R.user_ID = U.user_ID ORDER BY score DESC LIMIT 10", [], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        board.results = result;
        res.send(result);
    });
};