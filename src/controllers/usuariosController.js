const connection = require('../database/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const listar_usuarios = (req, res) => {
    connection.getConnection( (erro, conn) => {
        if(erro) return res.status(500).json({ erro: erro })
        const QUERY = 'SELECT id, nome, email, status FROM usuarios;'
        conn.query(QUERY, (erro, results) => {
            conn.release()
            if(erro) return res.status(500).json({ erro: erro })
            res.status(200).send(results)
        })
    })
};


const listar_usuario_id = (req, res) => {
  const id_usuario = req.params.id
  connection.getConnection( (erro, conn) => {
      if(erro) return res.status(500).json({ erro: erro })
      const QUERY = 'SELECT id, nome, email, status FROM usuarios WHERE id = ?;'
      conn.query(QUERY, [id_usuario] , (erro, results) => {
          conn.release()
          if(erro) return res.status(500).json({ erro: erro })
          if(results.length < 1){
            return res.status(404).json({
              mensagem: "Usuário não encontrado"
            })
          }
          return res.status(200).send(results)
      })
  })
};

const apagar_usuario = (req, res, next) => {
  const id_usuario = req.body.id
  connection.getConnection( (erro, conn) => {
      if(erro) return res.status(500).json({ erro: erro })
      conn.query('SELECT * FROM usuarios WHERE id = ?', [id_usuario] , (erro, results) => {
        conn.release()
        if(erro) return res.status(500).json({ erro: erro })
        if(results.length < 1){
          return res.status(404).json({
            mensagem: "Usuário não encontrado"
          })
        }
        const QUERY2 = 'DELETE FROM usuarios WHERE id = ?;'
        conn.query(
          QUERY2,
          [ id_usuario ],
          (erro, results) => {
              conn.release()
              if(erro) return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
             return res.send({mensagem: "usuario excluido com sucesso!" })
          })
    })
  })
};

const inserir_usuario = (req, res) => {
    const senha = req.body.senha
    bcrypt.hash(senha, 10, (err, hash) => {
        if(err) return res.status(500).json({ mensagem: 'Houve um erro!', erro: err })

        connection.getConnection((err, conn) => {
            if(err) return res.status(500).json({ mensagem: 'Houve um erro ao conectar!', erro: err })

            conn.query('SELECT * FROM usuarios WHERE email = ?', [ req.body.email ],
            (err, result) => {
                if(err) return res.status(500).json({erro: err});
                if(result.length > 0){
                    conn.release()
                    return res.status(409).json({
                        mensagem: "email já cadastrado!"
                    })
                }
                const QUERY = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);"
                conn.query(QUERY, [ req.body.nome, req.body.email, hash ], (err, result) => {
                    conn.release()
                    if(err) return res.status(500).json({ mensagem: "Houve um erro", erro: err })

                    return res.status(201).json({
                        mensagem: "Usuário Criado com sucesso!",
                        usuario: {
                            nome: req.body.nome,
                            email: req.body.email,
                            id: result.insertId
                        }
                    })
                })
            })
        })
    })
}

const login_usuario = (req, res) => {
    connection.getConnection((err, conn) => {
        if(err) return res.status(500).json({ mensagem: "Houve um erro", erro: err })
        conn.query('SELECT * FROM usuarios;', [ req.body.email ],
    (err, results) => {
       conn.release()
        if(err) return res.status(500).json({ mensagem: "Falha na Autenticação", erro: err })
        if(results.length < 1){
            res.status(401).json({
                mensagem: "Falha na Autenticação"
            })
        }
        bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
            if(err) return res.status(401).json({mensagem: "Falha na Autenticação"})
            if(result){
                const token = jwt.sign({
                    id:results[0].id,
                    email:results[0].email
                },process.env.JWT_KEY,
            {
                expiresIn:"7d"
            });
            return res.status(200).send({
                mensagem:"Autenticado com sucesso",
                token: token,
                usuario: {
                  id: results[0].id,
                  nome: results[0].nome,
                  email: results[0].email,
                  status: results[0].status
                }
              })
            }
            return res.status(401).send({mensagem:"Falha na Autenticação"})
        })

    })
    })
}

module.exports = {
    listar_usuarios,
    inserir_usuario,
    login_usuario,
    listar_usuario_id,
    apagar_usuario
}
