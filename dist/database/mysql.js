"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connection = void 0;
// const mysql = require('mysql2')
const mysql2_1 = __importDefault(require("mysql2"));
const sequelize_1 = require("sequelize");
exports.connection = mysql2_1.default.createPool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
exports.sequelize = new sequelize_1.Sequelize(String(process.env.DB_DATABASE), String(process.env.DB_USER), process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});
