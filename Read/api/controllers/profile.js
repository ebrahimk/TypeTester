const connection = require('../../db');

exports.login = function (req, res) {
    console.log("Profile request logged for userID: " + req.headers.user_id);
    var context ={};

    connection.query("SELECT date_taken, score FROM results WHERE user_ID = ?", [req.headers.user_id], function (err, result_tuples) {
        if (err) {
            console.log(err);
            return;
        }
        context.results = result_tuples;                    //add results tuples to the session
        //get the Top 5 most misspelled words for the given user

        connection.query("SELECT word, count FROM word AS W, top_misspelled AS T WHERE T.user_ID = ? AND W.word_ID = T.word_ID ORDER BY count DESC LIMIT 5", [req.headers.user_id], function (err, result_tuples) {
                if (err) {
                console.log(err);
            }
            context.top_mispelled = result_tuples;
            connection.query("SELECT * FROM user WHERE user_ID = ? ", [req.headers.user_id], function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                context.username = rows[0].username;
                res.send(context);
            });
        });
    });
};