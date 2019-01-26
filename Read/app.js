const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//configure body-parser operation
app.use(bodyParser.urlencoded({ extended: false }));

//prevent cross origin errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//import routes
const homeRoutes = require('./api/routes/home');
const profileRoutes = require('./api/routes/profile');
const leaderboardRoutes = require('./api/routes/leaderboard');
const userRoutes = require('./api/routes/user');

//use the middleware to direct requests
app.use('/', homeRoutes);
app.use('/profile', profileRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/user', userRoutes);

module.exports = app;
