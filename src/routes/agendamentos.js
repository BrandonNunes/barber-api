const router = require('express').Router()
const controller = require('../controllers/agendamentoController')
const authenticate = require('../middleware/login')

router.get('/agendamentos', authenticate, controller.listar_agendamentos );

router.get('/agendamentos/:id', authenticate, controller.listar_agendamento_id );

router.get('/agendamentos/usuario/:id', authenticate, controller.listar_agendamento_por_usuario );

router.post('/agendamentos/novo', authenticate, controller.inserir_agendamento );

router.delete('/agendamentos/delete', authenticate, controller.apagar_agendamento );

module.exports = router

