// const mysql = require('mysql2')
import mysql from 'mysql2'
import { Sequelize } from 'sequelize'

export const connection = mysql.createPool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const sequelize = new Sequelize(String(process.env.DB_DATABASE),
String(process.env.DB_USER), process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',//mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    timestamps: false
  }
});

