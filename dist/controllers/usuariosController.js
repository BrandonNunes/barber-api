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
exports.login_usuario = exports.inserir_usuario = exports.apagar_usuario = exports.listar_usuario_id = exports.listar_usuarios = void 0;
const Usuarios_1 = __importDefault(require("../models/Usuarios"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const listar_usuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuarios_1.default.findAll({
            attributes: { exclude: ['senha'] }
        });
        return res.status(200).json(usuarios);
    }
    catch (error) {
        console.log('ERRO: ' + error);
        return res.status(500).json({
            mensagem: 'Erro interno de servidor',
            erro: error
        });
    }
});
exports.listar_usuarios = listar_usuarios;
const listar_usuario_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_usuario = req.params.id;
        const usuario = yield Usuarios_1.default.findAll({
            where: { id: id_usuario },
            attributes: { exclude: ['senha'] }
        });
        if (!usuario || usuario.length == 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado!'
            });
        }
        return res.status(200).json(usuario);
    }
    catch (error) {
        console.log('ERRO: ' + error);
        return res.status(500).json({
            mensagem: 'Erro interno de servidor',
            erro: error
        });
    }
});
exports.listar_usuario_id = listar_usuario_id;
const apagar_usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const usuario = yield Usuarios_1.default.findAll({ where: { id } });
        if (!usuario || usuario.length == 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }
        yield Usuarios_1.default.destroy({ where: { id } }).then(() => {
            return res.status(200).json({
                mensagem: 'Usuário excluído com sucesso!'
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            mensagem: 'Erro interno dos servidor',
            erro: error
        });
    }
});
exports.apagar_usuario = apagar_usuario;
const inserir_usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, senha } = req.body;
    bcrypt.hash(senha, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(500).json({ mensagem: 'Houve um erro!', erro: err });
        try {
            const verifyUser = yield Usuarios_1.default.findAll({ where: { email } });
            if (verifyUser.length > 0) {
                return res.status(409).json({ mensagem: "email já cadastrado!" });
            }
            req.body.senha = hash;
            yield Usuarios_1.default.create(req.body);
            return res.status(201).json({
                mensagem: "Usuário Criado com sucesso!",
                usuario: {
                    nome: req.body.nome,
                    email: req.body.email
                }
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                mensagem: 'erro interno de servidor!',
                erro: error
            });
        }
    }));
});
exports.inserir_usuario = inserir_usuario;
const login_usuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const user = yield Usuarios_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                mensagem: "Falha na Autenticação"
            });
        }
        const verifyPass = bcrypt.compareSync(senha, user.senha);
        if (verifyPass) {
            let token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_KEY, { expiresIn: "7d" });
            return res.status(200).json({
                mensagem: "Autenticado com sucesso!",
                token: token,
                usuario: Object.assign(Object.assign({}, user.dataValues), { senha: undefined })
            });
        }
        return res.status(401).send({ mensagem: "Falha na Autenticação" });
    }
    catch (e) {
        return res.status(500).send({ mensagem: "Falha na Autenticação", erro: e });
    }
});
exports.login_usuario = login_usuario;
