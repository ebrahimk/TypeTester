const connection = require('../../db');

exports.populate_words = function (req, res) {
    //query DB for 300 words
    console.log("requesting words...");
    connection.query("SELECT * FROM word ORDER BY RAND() LIMIT 300;", [], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        res.send(result);
    });
};
