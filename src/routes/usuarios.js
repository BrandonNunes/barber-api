const router = require('express').Router()
const authenticate = require('../middleware/login')

const controller = require('../controllers/usuariosController');

router.get('/usuarios', authenticate, controller.listar_usuarios);

router.get('/usuarios/:id', authenticate, controller.listar_usuario_id);

router.post('/usuarios/novo', controller.inserir_usuario);

router.delete('/usuarios/delete', authenticate, controller.apagar_usuario);

router.post('/login', controller.login_usuario);

module.exports = router
