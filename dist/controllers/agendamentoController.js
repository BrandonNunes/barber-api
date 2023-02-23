"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apagar_agendamento = exports.inserir_agendamento = exports.listar_agendamento_por_usuario = exports.listar_agendamento_id = exports.listar_agendamentos = void 0;
const Agendamentos_1 = __importDefault(require("../models/Agendamentos"));
const Usuarios_1 = __importDefault(require("../models/Usuarios"));
const listar_agendamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agendamento = yield Agendamentos_1.default.findAll({ include: Usuarios_1.default });
        return res.json(agendamento);
    }
    catch (erro) {
        return res.status(500).json({
            mensagem: 'erro interno de servidor',
            erro: erro
        });
    }
});
exports.listar_agendamentos = listar_agendamentos;
const listar_agendamento_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_agendamento = req.params.id;
    try {
        const agendamento = yield Agendamentos_1.default.findByPk(id_agendamento);
        if (!agendamento)
            return res.status(404).json({ mensagem: 'Nenhum agendamento encontrado' });
        return res.status(200).json(agendamento);
    }
    catch (erro) {
        return res.status(500).json({ mensagem: "Houve um erro", erro: erro });
    }
});
exports.listar_agendamento_id = listar_agendamento_id;
const listar_agendamento_por_usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_usuario = req.params.id;
    try {
        const agendamento = yield Agendamentos_1.default.findAll({ where: { id_usuario }, include: [{ model: Usuarios_1.default }] });
        if (!agendamento)
            return res.status(404).json({ mensagem: 'Nenhum agendamento encontrado' });
        return res.status(200).json(agendamento);
    }
    catch (erro) {
        return res.status(500).json({ mensagem: "Houve um erro!", erro: erro });
    }
});
exports.listar_agendamento_por_usuario = listar_agendamento_por_usuario;
const inserir_agendamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAgend = req.body;
    try {
        yield Agendamentos_1.default.create(newAgend);
        return res.status(201).json({ mensagem: 'Agendamento criado com sucesso!' });
    }
    catch (erro) {
        return res.status(500).json({ mensagem: "Houve um erro!", erro: erro });
    }
});
exports.inserir_agendamento = inserir_agendamento;
const apagar_agendamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_agendamento = req.body.id;
    try {
        yield Agendamentos_1.default.destroy({ where: { id: id_agendamento } });
    }
    catch (erro) {
        return res.status(500).json({ mensagem: "Houve um erro!", erro: erro });
    }
});
exports.apagar_agendamento = apagar_agendamento;
