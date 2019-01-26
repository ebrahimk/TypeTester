const connection = require('../../db');

require('dotenv').config();

/**************** HELPER FUNCTIONS ********************************/
//adds a login tuple to the database
function createLogin(userID){
    connection.query("INSERT INTO login (user_ID, time) VALUES (?, ?)", [userID, getDateTime()], function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("1 login recorded");
    });
}

//function used to produce datetime formatted variables
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + ":" + " " + hour + ":" + min + ":" + sec;
}

/************* END HELPER FUNCTIONS *****************************************/

exports.enter_credentials = function(req, res) {
    var context = {};
    console.log("existing account belonging to user with ID: " + req.headers.user_id + " Performing login");

    createLogin(req.headers.user_id);                               //add login tuple for security
    console.log("successful login!");

    //get the associated results tuple for the user
    connection.query("SELECT date_taken, score FROM results WHERE user_ID = ?", [req.headers.user_id], function(err, result_tuples) {
        if (err) {
            console.log(err);
            return;
        }

        context.results = result_tuples;                    //add results tuples to the session

        //get the Top 5 most misspelled words for the given user
        connection.query("SELECT word, count FROM word AS W, top_misspelled AS T WHERE T.user_ID = ? AND W.word_ID = T.word_ID ORDER BY count DESC LIMIT 5", [req.headers.user_id], function(err, result_tuples) {
            if (err) {
                console.log(err);
                return;
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

