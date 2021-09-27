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
var models = require('./app/models');
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

//models
var models = require('./app/models');

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


// Route View List
app.get('/', (req, res) => {
    res.render("index");
});

app.post("/subscribe", (req, res) => {

    var fname = req.body.fname;
    var email = req.body.email;


    if (!fname || !email) {
        var api = {
            status: false,
            message: 'Something Missing'
        }
        return res.status(200).send(api);
    }

    var Subscribers = models.subscribers;

    Subscribers.findAll({
        where: {
            subscribers_email: email
        },
    }).then(sub => {
        if (sub.length == 0) {
            var data = {
                subscribers_name:fname,
                subscribers_email:email
            }
            Subscribers.create(data).then(addCustomer => {
                if (addCustomer.length != 0) {
                    var api = {
                        status: true,
                        message: 'Successfully Subscribed'
                    }
                    return res.status(200).send(api);
                } else {
                    var api = {
                        status: false,
                        message: 'Something Wrong'
                    }
                    return res.status(200).send(api);
                }

            }).catch(function (err) {
                Logger.error(req.originalUrl + ':' + err);
                var api = {
                    status: false,
                    message: 'Something Wrong!!'
                }
                return res.status(500).send(api);
            });
        } else {
            var api = {
                status: false,
                message: 'This Email Already Subscribed!'
            }
            return res.status(200).send(api);    
        }
    }).catch(function (err) {
        Logger.error(req.originalUrl + ':' + err);
        var api = {
            status: false,
            message: 'Something Wrong!!'
        }
        return res.status(500).send(api);
    });


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

const port = process.env.PORT || 8888;

var server =  app.listen(port,() =>{
    console.log('Server start in ' + port);
});

module.exports.app = app;