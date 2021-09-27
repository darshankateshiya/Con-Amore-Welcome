var mysql = require('mysql');

var env = process.env.NODE_ENV || "development";
var config = require('./config.json')[env];

var host = config.host;
var userName = config.username;
var database = config.database;
var password = config.password;

var connection = mysql.createPool({
    connectionLimit: 50,
    port:3308,
    host: host,
    user: userName,
    password: password,
    database: database
});

module.exports.conn = connection;
