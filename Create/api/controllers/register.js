const connection = require('../../db');
const bcrypt = require('bcrypt');

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

exports.enter_credentials = function(req, res) {
    console.log("Create service received a request!");

    bcrypt.hash(req.headers.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json()({
                error: err
            });
        } else {
            //add a new user tuple to the database, salt and hash passwords
            console.log("PW written to DB:" + hash);
            connection.query("INSERT INTO user (username, password) VALUES (?, ?)", [req.headers.username, hash], function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("1 record inserted");
                //query for the newly inserted user_ID (set to auto-increment)
                connection.query("SELECT * FROM user WHERE username = ?", [req.headers.username], function (err, rows) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    createLogin(rows[0].user_ID);
                    res.send(rows[0]);
                });
            });
        }
    })
}