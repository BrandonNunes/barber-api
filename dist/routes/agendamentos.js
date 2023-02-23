"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rotasAgendamentos = (0, express_1.Router)();
const agendamentoController_1 = require("../controllers/agendamentoController");
// const controller = require('../controllers/agendamentoController')
const authenticate = require('../middleware/login');
rotasAgendamentos.get('/agendamentos', authenticate, agendamentoController_1.listar_agendamentos);
rotasAgendamentos.get('/agendamentos/:id', authenticate, agendamentoController_1.listar_agendamento_id);
rotasAgendamentos.get('/agendamentos/usuario/:id', authenticate, agendamentoController_1.listar_agendamento_por_usuario);
rotasAgendamentos.post('/agendamentos/novo', authenticate, agendamentoController_1.inserir_agendamento);
rotasAgendamentos.delete('/agendamentos/delete', authenticate, agendamentoController_1.apagar_agendamento);
exports.default = rotasAgendamentos;
