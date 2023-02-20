import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(String(process.env.DB_DATABASE),
String(process.env.DB_USER), process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',//mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    timestamps: false
  }
});

