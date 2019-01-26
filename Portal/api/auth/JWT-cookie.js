const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("JWT KEY: " + process.env.JWT_KEY);
    //sign a JSON web token
    const token = jwt.sign(
        {
            user_Id: res.locals.user.user_ID
        },
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        });
    //send the cookie to the client with the JWT token
    res.cookie('jwt', token);
    next();
};