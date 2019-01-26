const connection = require('../../db');
const request = require('request');

module.exports = (req, res, next) => {

    if(req.body['passWord']) {
        if (req.body.passWord !== req.body.userRePassword || req.body.passWord === "") {    //send error if passwords do not match
            context.error = "you did not enter the same password!";
            res.render('profileCreation', context);
            return;
        }
        if (req.body.passWord.length < 10) {                                               //send error if password is too short
            context.error = "Passwords must be at least 10 characters long!";
            res.render('profileCreation', context);
        }
        else{
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
                    const options = {
                        url: 'http://' + process.env.CREATE_IP + ':1341/register',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Accept-Charset': 'utf-8',
                            'password': req.body.passWord,
                            'username': req.body.username
                        }
                    };

                    //send the request to the Create service to remove the entry
                    request(options, function(err, response) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        console.log("New account created successfully!");
                        res.locals.user = JSON.parse(response.body);
                        console.log(res.locals.user);
                        next();
                    });
                }
            });
        }
    }
};
