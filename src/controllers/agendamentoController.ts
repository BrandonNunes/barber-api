// const connection = require('../database/mysql')
import { connection } from "../database/database";
import { Request, Response } from "express";
import Agendamentos from "../models/Agendamentos";
import Usuarios from "../models/Usuarios";

export const listar_agendamentos = async (req: Request, res: Response) => {
  try {
    const agendamento: any = await Agendamentos.findAll({include: Usuarios})
    return res.json(agendamento)
  }catch (erro) {
    return res.status(500).json({
      mensagem: 'erro interno de servidor',
      erro: erro
    })
  }
};


export const listar_agendamento_id = async (req: Request, res: Response) => {
  const id_agendamento = req.params.id
  try {
    const agendamento = await Agendamentos.findByPk(id_agendamento)
    if (!agendamento) return res.status(404).json({mensagem: 'Nenhum agendamento encontrado'})
    return res.status(200).json(agendamento)
  }catch (erro) {
    return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
  }
};

export const listar_agendamento_por_usuario = async (req: Request, res: Response) => {
  const id_usuario = req.params.id
  try {
    const agendamento = await Agendamentos.findAll({where: {id_usuario}, include: [{model: Usuarios }]})
    if (!agendamento) return res.status(404).json({mensagem: 'Nenhum agendamento encontrado'})
    return res.status(200).json(agendamento)
  }catch (erro) {
    return res.status(500).json({ mensagem: "Houve um erro!", erro: erro })
  }
};

export const inserir_agendamento = async (req: Request, res: Response) => {
  const newAgend = req.body
  try {
    await Agendamentos.create(newAgend)
    return res.status(201).json({mensagem: 'Agendamento criado com sucesso!'})
  }catch (erro) {
    return res.status(500).json({ mensagem: "Houve um erro!", erro: erro })
  }
}

export const apagar_agendamento = async (req: Request, res: Response) => {
  const id_agendamento = req.body.id
  try {
    await Agendamentos.destroy({where: {id: id_agendamento}})
  }catch (erro) {
    return res.status(500).json({ mensagem: "Houve um erro!", erro: erro })
  }
}
