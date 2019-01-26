const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//configure body-parser operation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//enable the cookie parser module
app.use(cookieParser());

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
const deleteRoutes = require('./api/routes/delete');
const leaderboardRoutes = require('./api/routes/leaderboard');
const profileCreationRoutes = require('./api/routes/profileCreation');
const userRoutes = require('./api/routes/user');

//use the middleware to direct requests
app.use('/', homeRoutes);
app.use('/profile', profileRoutes);
app.use('/delete', deleteRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/profileCreation', profileCreationRoutes);
app.use('/user', userRoutes);

// 404 error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// 500 error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
