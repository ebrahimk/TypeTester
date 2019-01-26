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

module.exports = (req, res, next) => {
    var context ={};

    if(req.body['passWord']) {
        if (req.body.passWord !== req.body.userRePassword || req.body.passWord === "") {    //send error if passwords do not match
            context.error = "you did not enter the same password!";
            res.render('profileCreation', context);
            return;
        }
        if(req.body.passWord.length < 10 ) {                                               //send error if password is too short
            context.error = "Passwords must be at least 10 characters long!";
            res.render('profileCreation', context);
        }
        else{                                                                              //query the database for any user tuples with the same username, node-mysql automatically performs escaping
            connection.query("SELECT COUNT(*) AS identicalUser FROM user WHERE username = ?", [req.body.username], function(err, rows){
                if(err){
                    console.log(`Error line 157: ${err}`);
                    return;
                }
                if(rows[0].identicalUser === 1) {                                            //entered username already exists in the database
                    context.error = "Username already exists!";
                    res.render('profileCreation', context);
                }
                else{
                    bcrypt.hash(req.body.passWord, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json()({
                                error: err
                            });
                        } else {
                            //add a new user tuple to the database, salt and hash passwords
                            console.log("PW written to DB:" + hash);
                            connection.query("INSERT INTO user (username, password) VALUES (?, ?)", [req.body.username, hash], function (err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                console.log("1 record inserted");
                                //query for the newly inserted user_ID (set to auto-increment)
                                connection.query("SELECT * FROM user WHERE username = ?", [req.body.username], function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    createLogin(rows[0].user_ID);
                                    //console.log("returned value from db: " + rows[0].user_ID);
                                    res.locals.user = rows[0];
                                   // console.log("In middleware: " + res.locals.user.username);
                                    next();
                                });
                            });
                        }
                    });
                }
            });
        }
    }
};
