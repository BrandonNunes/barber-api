const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    try {
        const authorization = req.headers.authorization
        if(authorization){
          const token = authorization.split(' ')[1];
          const decode = jwt.verify(token, process.env.JWT_KEY);
          req.usuario = decode;
          next();
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            mensagem:"Falha na autenticação" });
    }
}
