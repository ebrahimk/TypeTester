const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ADMIN,
    password: process.env.DB_PASSWORD,
    database: "typetest_db",
    port: 3306});

module.exports = connection;