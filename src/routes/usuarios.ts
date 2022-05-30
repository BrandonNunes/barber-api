// const router = require('express').Router()
import { Router } from "express";
const rotasUsuarios = Router()
const authenticate = require('../middleware/login')

const controller = require('../controllers/usuariosController');

rotasUsuarios.get('/usuarios', authenticate, controller.listar_usuarios);

rotasUsuarios.get('/usuarios/:id', authenticate, controller.listar_usuario_id);

rotasUsuarios.post('/usuarios/novo', controller.inserir_usuario);

rotasUsuarios.delete('/usuarios/delete', authenticate, controller.apagar_usuario);

rotasUsuarios.post('/login', controller.login_usuario);

 // module.exports = rotasUsuarios
export default rotasUsuarios
