const port = process.env.PORT || 4000
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const rotasUsuarios = require('./src/routes/usuarios')
const rotasAgendamentos = require('./src/routes/agendamentos')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


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

app.listen( port, () => {
    console.log('Server Running in the port: '+port)
})
