const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminSequelize = require('@adminjs/sequelize')
import { sequelize } from "../database/database"

AdminJS.registerAdapter(AdminSequelize)
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
  databases: [sequelize],
  rootPath: '/admin',
  locale,
  branding: {
    companyName: 'Barbearia API',
    softwareBrothers: false,
    logo: '',
  },
})
const ADMIN = {
  email: 'admin@admin',
  password: 'admin'
}
const routerAdmin = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  cookieName: 'adminjs',
  cookiePassword: 'adminjs',
  authenticate: async (email: string, password: string) => {
    if(email===ADMIN.email && password===ADMIN.password){
      return ADMIN;
    }
    return null;
  }
})

export default routerAdmin