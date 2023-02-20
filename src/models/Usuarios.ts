import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import Agendamentos from "./Agendamentos";

const Usuarios = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },

})

export default Usuarios;