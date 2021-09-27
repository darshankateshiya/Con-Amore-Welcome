const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Logger = require('./config/logger');
var RedisStore = require('rate-limit-redis');
const rateLimit = require("express-rate-limit");
const methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const logger = require('morgan');
// const socket = require('./config/socket');
const path = require('path');
var env = require('dotenv').config();
var winston = require('winston'),
expressWinston = require('express-winston');
// const robots = require('express-robots-txt');

const xss = require('xss-clean');

//global variable
global.globalRootPath = __dirname;

//Configuration app use
app.use(express.static(__dirname + "/public"));
app.use('/static', express.static(__dirname + '/public/img'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(methodOverride("_method"));
app.use(express.json());


//session
app.use(cookieParser('secret'));    
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

//For Ejs
app.set('views', path.join(__dirname,'./app/views'));
app.set("view engine", "ejs");

//xss-clear
app.use(xss());


// Route View List
app.get('/', (req, res) => {
    res.render("index");
});

app.post("/subscribe", (req, res) => {
    console.log(req.body);
    res.send({ status: true, message: "done" });
});

app.use(expressWinston.errorLogger({
    transports: [
             new winston.transports.File({ filename: './config/log/express-log/error.log', level: 'error' }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
}));

const port = process.env.PORT || 1000;

var server =  app.listen(port,() =>{
    console.log('Server start in ' + port);
});

module.exports.app = app;