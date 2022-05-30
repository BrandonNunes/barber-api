import { Router } from "express";
const rotasAgendamentos = Router()
import { apagar_agendamento, inserir_agendamento, listar_agendamento_id, listar_agendamento_por_usuario, listar_agendamentos } from "../controllers/agendamentoController";
// const controller = require('../controllers/agendamentoController')
const authenticate = require('../middleware/login')

rotasAgendamentos.get('/agendamentos', authenticate, listar_agendamentos );

rotasAgendamentos.get('/agendamentos/:id', authenticate, listar_agendamento_id );

rotasAgendamentos.get('/agendamentos/usuario/:id', authenticate, listar_agendamento_por_usuario );

rotasAgendamentos.post('/agendamentos/novo', authenticate, inserir_agendamento );

rotasAgendamentos.delete('/agendamentos/delete', authenticate, apagar_agendamento );

export default rotasAgendamentos;
