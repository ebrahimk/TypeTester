const connection = require('../../db');

/**************** HELPER FUNCTIONS ********************************/
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

exports.update_misspelled = function(req){

    console.log("updating service the profile with user ID: " + req.headers.user_id + " WPM: " + req.headers.wpm);
    console.log("Top misspelled words: " + req.headers.misspelled);

    connection.query("INSERT INTO results (user_ID, date_taken, score) VALUES (?, ?, ?)", [req.headers.user_id, getDateTime(), req.headers.wpm], function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("1 result recorded");
    });

    var misspelled = req.headers.misspelled.split(",").map(Number);        //take the array of misspelled words from the front end
    console.log(misspelled);

    misspelled.forEach(function (word) {                          //for each of these words, check if it has already been misspelled by the user
        console.log(`WORD: ${word}`);
        connection.query("SELECT COUNT(*) AS valid FROM top_misspelled WHERE word_ID = ? AND user_ID = ?", [word, req.headers.user_id], function (err, rows) {
            if (err) {
                console.log(err);
            }
            if (rows[0].valid === 1) {                                    //if the word has been misspelled increment the number of times its been misspelled in the database
                console.log("user " + req.headers.user_id + " has already encountered word: " + word);
                connection.query("UPDATE top_misspelled SET count = count + 1 WHERE word_ID = ? AND user_ID = ?", [word, req.headers.user_id], function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("1 row updated in top_misspelled");
                });
            } else if (rows[0].valid === 0) {                               //if the word has not been misspelled, add a new tuple ot the top_misspelled relation
                console.log("word " + word + " not recorded for user: " + req.headers.user_id);
                connection.query("INSERT INTO top_misspelled (user_ID, word_ID, count) VALUES (?, ?, ?)", [req.headers.user_id, word, 1], function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("1 row inserted into top_misspelled");
                });
            }
        })
    });
};
