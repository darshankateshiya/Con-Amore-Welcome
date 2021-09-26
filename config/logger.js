const { createLogger, transports, format } = require('winston');  
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      winston.format.json(),
      format. prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: './config/log/error.log', level: 'error' }),
      new winston.transports.File({ filename: './config/log/combined.log' })
    ]
});
  
// { 
//     emerg: 0, 
//     alert: 1, 
//     crit: 2, 
//     error: 3, 
//     warning: 4, 
//     notice: 5, 
//     info: 6, 
//     debug: 7
//   }

// Logger.info('Server start in ' + port);
// Logger.error('Server start in ' + port);
// Logger.warn("Hello");

// Logger.log('silly', "127.0.0.1 - there's no place like home");
// Logger.log('debug', "127.0.0.1 - there's no place like home");
// Logger.log('verbose', "127.0.0.1 - there's no place like home");
// Logger.log('info', "127.0.0.1 - there's no place like home");
// Logger.log('warn', "127.0.0.1 - there's no place like home");
// Logger.log('error', "127.0.0.1 - there's no place like home");
// Logger.info("127.0.0.1 - there's no place like home");
// Logger.warn("127.0.0.1 - there's no place like home");
// Logger.error("127.0.0.1 - there's no place like home");


module.exports = logger;