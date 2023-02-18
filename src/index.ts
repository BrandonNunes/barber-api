require('dotenv').config()
import express ,{ Express, Request, Response } from "express"
import morgan from "morgan"
import cors from 'cors'
import rotasUsuarios from "./routes/usuarios"
import rotasAgendamentos from './routes/agendamentos'
const port = process.env.PORT || 4000
import { sequelize } from "./database/mysql"
import routerAdmin from "./admin"

const app = express()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');


//app.use(adminJs.options.rootPath, router)
app.use('/admin', routerAdmin)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('combined'))
app.use(cors())
app.use('/api', rotasUsuarios)
app.use('/api', rotasAgendamentos)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api', (req, res) => {
    res.json({
        mensagem: 'Servidor on'
    })
})
app.get('/', (req, res) => {
  res.json({
      mensagem: 'Servidor on, use /api para usar os recursos'
  })
})


const verifyConnection = async () => {
  try {
    await sequelize.authenticate();
   // await sequelize.sync({force: true})
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen( port, () => {
    console.log('Server Running in the port: '+port)
    verifyConnection()
})
