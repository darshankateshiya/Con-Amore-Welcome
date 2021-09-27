var mysql = require('mysql');

var env = process.env.NODE_ENV || "development";
var config = require('./config.json')[env];

var host = config.host;
var userName = config.username;
var database = config.database;
var password = config.password;

var connection = mysql.createConnection({
    host: host,
    user: userName,
    password: password,
    database: database
});

connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }
    console.log('connected as id ' + connection.threadId);
});



module.exports = connection;
