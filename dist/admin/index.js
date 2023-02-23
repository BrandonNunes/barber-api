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
Object.defineProperty(exports, "__esModule", { value: true });
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminSequelize = require('@adminjs/sequelize');
const database_1 = require("../database/database");
AdminJS.registerAdapter(AdminSequelize);
const locale = {
    translations: {
        labels: {
            // change Heading for Login
            loginWelcome: '',
        },
        messages: {
            loginWelcome: '',
        },
    },
};
const adminJs = new AdminJS({
    databases: [database_1.sequelize],
    rootPath: '/admin',
    locale,
    branding: {
        companyName: 'Barbearia API',
        softwareBrothers: false,
        logo: '',
    },
});
const ADMIN = {
    email: 'admin@admin',
    password: 'admin'
};
const routerAdmin = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    cookieName: 'adminjs',
    cookiePassword: 'adminjs',
    authenticate: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    })
});
exports.default = routerAdmin;
