const connection = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var context = {};
    console.log("JWT: " + req.cookies.jwt);
    try {
        jwt.verify(req.cookies.jwt, process.env.JWT_KEY, function (err, decoded) {
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
                }
                else{
                    console.log("HERE");
                    res.locals.user = rows[0];
                    next();
                }
            });
        });
    }catch (e){
        console.log("verification failed... ");
        res.render('login', context);
    }
};