const { exec } = require('child_process');
const moment = require('moment');

var env = process.env.NODE_ENV || "development";
var config = require('./config.json')[env];
// Where would the file be located?
const currentDateAndTime = moment(Date.now()).format('YYYY-MM-DD_HH:mm:ss');
let dumpFile ="dump.sql";	

var host = config.host;
var userName = config.username;
var database = config.database;
var password = config.password;


// Database connection settings.
let exportFrom = {
	host: host,
	user: userName,
	password: password,
	database: database
}

console.log(`Starting exporting data from the ${exportFrom.database} database`);

// Execute a MySQL Dump and redirect the output to the file in dumpFile variable.
exec(`mysqldump -u${exportFrom.user} -p${exportFrom.password} -h${exportFrom.host} --compact ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
    if (err) { console.error(`exec error: ${err}`); return; }
    console.log('DB Backup Done');
});

      