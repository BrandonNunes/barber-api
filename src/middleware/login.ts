import { Express, Request, Response } from "express"
const jwt = require('jsonwebtoken');

module.exports = (req: any, res: Response, next: any) => {
    try {
        const authorization = req.headers.authorization
        if(authorization){
          const token = authorization.split(' ')[1];
          if(!token){
            return res.status(401).json({
              mensagem:"Falha na autenticação"
            })
          }
          const decode = jwt.verify(token, process.env.JWT_KEY);
          req.usuario = decode;
          next();
        }else{
          return res.status(401).json({
            mensagem:"Falha na autenticação"
          })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            mensagem:"Falha na autenticação" });
    }
}
