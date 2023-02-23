"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const Usuarios_1 = __importDefault(require("./Usuarios"));
const Agendamentos = database_1.sequelize.define('agendamentos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    data_agendamento: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    horario: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    barbeiro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
});
Agendamentos.belongsTo(Usuarios_1.default, { foreignKey: 'id_usuario' });
exports.default = Agendamentos;
