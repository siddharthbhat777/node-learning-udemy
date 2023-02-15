const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-learning',
    password: 'Sid@2023'
});

module.exports = pool.promise(); // helpful in handling asyncronous tasks