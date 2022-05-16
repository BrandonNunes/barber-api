const mysql = require('mysql2')

const connection = mysql.createPool({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MSQL_PASSWORD,
    port: process.env.MYSQL_PORT
})

module.exports = connection;
