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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const agendamentos_1 = __importDefault(require("./routes/agendamentos"));
const port = process.env.PORT || 4000;
const database_1 = require("./database/database");
const admin_1 = __importDefault(require("./admin"));
const app = (0, express_1.default)();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger');
//app.use(adminJs.options.rootPath, router)
app.use('/admin', admin_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api', usuarios_1.default);
app.use('/api', agendamentos_1.default);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api', (req, res) => {
    res.json({
        mensagem: 'Servidor on'
    });
});
app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor on, use /api para usar os recursos'
    });
});
const verifyConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate();
        // await sequelize.sync({force: true})
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
app.listen(port, () => {
    console.log('Server Running in the port: ' + port);
    verifyConnection();
});
