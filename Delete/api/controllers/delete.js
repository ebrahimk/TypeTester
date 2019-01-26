const connection = require('../../db');

exports.delete_profile = function(req, res) {
    console.log("Delete requested");
   // console.log(req);
    connection.query("DELETE FROM user WHERE user_ID = ?", [req.headers.user_id], function (err, result) {      //make the delete SQL query
        if (err) {
            console.log(err);
            return;
        }
        console.log("deleted user with useir_ID: " + req.headers.user_id);
    });
};

