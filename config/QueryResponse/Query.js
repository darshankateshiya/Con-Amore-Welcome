const connection = require('./../DB.js');

var sqlQuery = function sqlConnection(sql, values, callback) {

    // It means that the values hasnt been passed
 
    connection.conn.getConnection((err, tempcount) => {
        
        if (err) {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
                callback(err,null);
            }
        }else {
            tempcount.query(sql,values,(error, rows, fields) => {
                tempcount.release();
                if (error) {
                    console.log(error);
                    callback(error,null);
                }else {
                    callback(null,rows);
                }

            });
        }
    });

};


module.exports = { sqlQuery, connection };
