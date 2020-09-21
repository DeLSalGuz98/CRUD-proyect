const mysql = require('mysql');

const {database} = require('./keys');
const pool = mysql.createPool(database);

const {promisify} = require('util');

pool.getConnection(function(err, connection){
    if(err){
        throw err;
    }
    if(connection){
        connection.release();
        console.log('Data Base Conected');
    }
    return;    
});

pool.query = promisify(pool.query);

module.exports = pool;