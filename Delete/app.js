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
const deleteRoutes = require('./api/routes/delete');

//use the middleware to direct requests
app.use('/delete', deleteRoutes);

module.exports = app;
