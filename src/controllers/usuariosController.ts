// const connection = require('../database/mysql')
import { connection } from "../database/mysql";
import { Request, Response } from "express";
import Usuarios from "../models/Usuarios";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


export const listar_usuarios = async (req: Request, res: Response) => {
  try{
    const usuarios = await Usuarios.findAll({
      attributes:{ exclude:['senha']}
    })
   return res.status(200).json(usuarios)
  }catch(error){
    console.log('ERRO: '+error)
    return res.status(500).json({
      mensagem: 'Erro interno de servidor',
      erro: error
    })
  }
};

export const listar_usuario_id = async (req: Request, res: Response) => {
  try{
    const id_usuario = req.params.id
    const usuario = await Usuarios.findAll({
      where: { id: id_usuario },
      attributes: {exclude: ['senha']}
    });
    if(!usuario || usuario.length == 0){
      return res.status(404).json({
        mensagem: 'Usuário não encontrado!'
      })
    }
    return res.status(200).json(usuario)
  }catch(error){
    console.log('ERRO: '+error)
    return res.status(500).json({
      mensagem: 'Erro interno de servidor',
      erro: error
    })
  }
};

export const apagar_usuario = async (req: Request, res: Response) => {
  const { id } = req.body
  try {
    const usuario = await Usuarios.findAll({where: {id} })
     if(!usuario || usuario.length == 0){
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }
    await Usuarios.destroy({where:{id}}).then(()=>{
      return res.status(200).json({
        mensagem: 'Usuário excluído com sucesso!'
      })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      mensagem: 'Erro interno dos servidor',
      erro: error
    })
  }
};

export const inserir_usuario = async (req: Request, res: Response) => {
    const {nome, email, senha} = req.body
    bcrypt.hash(senha, 10, async (err: any, hash: any) => {
        if(err) return res.status(500).json({ mensagem: 'Houve um erro!', erro: err })
        try {
          const verifyUser = await Usuarios.findAll({ where: { email } })
          if(verifyUser.length > 0){
            return res.status(409).json({ mensagem: "email já cadastrado!" })
        }
        req.body.email = hash
        await Usuarios.create( req.body )
        return res.status(201).json({
          mensagem: "Usuário Criado com sucesso!",
          usuario: {
              nome: req.body.nome,
              email: req.body.email
          }
      })
        } catch (error) {
          console.log(error)
          return res.status(500).json({
            mensagem: 'erro interno de servidor!',
            erro: error
          })
        }
    })
}

export const login_usuario = (req: Request, res: Response) => {
    connection.getConnection((err, conn) => {
        if(err) return res.status(500).json({ mensagem: "Houve um erro", erro: err })
        conn.query('SELECT * FROM usuarios;', [ req.body.email ],
    (err, results: any) => {
       conn.release()
        if(err) return res.status(500).json({ mensagem: "Falha na Autenticação", erro: err })
        if(Array(results).length < 1){
            res.status(401).json({
                mensagem: "Falha na Autenticação"
            })
        }
        bcrypt.compare(req.body.senha, results[0].senha, (err: any, result: any) => {
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
