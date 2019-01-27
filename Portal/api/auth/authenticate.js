const connection = require('../../db');
const bcrypt = require('bcrypt');

module.exports = (req,res,next) => {
        context = {};
        if(req.body['password'] && req.body['username']){
            //query the database to see if a tuple exists with the provided username and password
            connection.query("SELECT * FROM user WHERE username = ?", [req.body.username], function(err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                if(rows.length < 1){
                    context.error = "invalid login credentials!";
                    res.render('login', context);
                    return;
                }
                console.log("PW in DB: " + rows[0].password);
                console.log("Entered PW: " + req.body.password);

                bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if(result){
                        res.locals.user =  rows[0];
                        next();
                    }
                    else {
                        context.error = "invalid login credentials!";
                        res.render('login', context);
                    }
                });
            });
        }
        else{
            context.error = "invalid login credentials!";
            res.render('login', context);
        }
};
