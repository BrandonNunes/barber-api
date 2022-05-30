// const mysql = require('mysql2')
import mysql from 'mysql2'
import { Sequelize } from 'sequelize'

export const connection = mysql.createPool({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT)
})

export const sequelize = new Sequelize(String(process.env.MYSQL_DATABASE),
String(process.env.MYSQL_USER), process.env.MSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',//mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    timestamps: false
  }
});

