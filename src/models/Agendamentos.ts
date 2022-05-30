import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/mysql";
import Usuarios from "./Usuarios";

const Agendamentos = sequelize.define('agendamentos', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  data_agendamento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horario: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  barbeiro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

})
Agendamentos.belongsTo(Usuarios, { foreignKey: 'id_usuario' })


export default Agendamentos;