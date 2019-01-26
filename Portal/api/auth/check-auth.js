const connection = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //verify if the supplied JWT token with the request cookie is valid, if so the user is already logged in and there is no need to enter login credentials
    console.log("inside check auth");
    var context = {};

    try {
        jwt.verify(req.cookies.jwt, process.env.JWT_KEY, function (err, decoded) {
            //console.log("user_ID HERE: " + decoded.user_Id);

            console.log("valid token found...");
            connection.query("SELECT * FROM user WHERE user_ID = ?", [decoded.user_Id], function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("result: " + rows.length);
                if (rows.length < 1) {
                    console.log("username does not exits");
                    context.error = "invalid login credentials!";
                    res.render('login', context);
                } else {
                    connection.query("SELECT date_taken, score FROM results WHERE user_ID = ?", [decoded.user_Id], function (err, result_tuples) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        context.results = result_tuples;
                        //get the Top 5 most misspelled words for the given user
                        connection.query("SELECT word, count FROM word AS W, top_misspelled AS T WHERE T.user_ID = ? AND W.word_ID = T.word_ID ORDER BY count DESC LIMIT 5", [decoded.user_Id], function (err, result_tuples) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            context.top_mispelled = result_tuples;
                            connection.query("SELECT * FROM user WHERE user_ID = ? ", [decoded.user_Id], function (err, rows) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                context.username = rows[0].username;
                                res.render('account', context);
                            });
                        });
                    });
                }
            });
        });
    }
    catch (e){
        console.log("Failed");
        next();
    }
};
