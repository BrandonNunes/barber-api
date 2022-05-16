const connection = require('../database/mysql')

const listar_agendamentos = (req, res) => {
  connection.getConnection((err, conn) => {
      if(err) return res.status(500).json({ mensagem: "Houve um erro!", erro: err })
      conn.query('SELECT agendamentos.*, usuarios.nome AS nome_usuario FROM agendamentos INNER JOIN usuarios ON agendamentos.id_usuario = usuarios.id;',
      (erro, results) => {
           conn.release()
           if(erro) return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
           return res.status(200).send(results)
      })
  })
};


const listar_agendamento_id = (req, res) => {
  const id_agendamento = req.params.id
  connection.getConnection((err, conn) => {
      if(err) return res.status(500).json({ mensagem: "Houve um erro!", erro: err })
      conn.query('SELECT agendamentos.*, usuarios.nome AS nome_usuario FROM agendamentos INNER JOIN usuarios ON agendamentos.id_usuario = usuarios.id WHERE agendamentos.id = ?;',
      [id_agendamento],
      (erro, results) => {
           conn.release()
           if(erro) return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
           if(results.length < 1){
             return res.status(404).json({
               mensagem: "Nenhum agendamento encontrado"
             })
           }
           return res.status(200).send(results)
      })
  })
};

const listar_agendamento_por_usuario = (req, res) => {
  const id_usuario = req.params.id
  connection.getConnection((err, conn) => {
      if(err) return res.status(500).json({ mensagem: "Houve um erro!", erro: err })
      conn.query('SELECT agendamentos.*, usuarios.nome AS nome_usuario FROM agendamentos INNER JOIN usuarios ON agendamentos.id_usuario = usuarios.id WHERE id_usuario = ?;',
      [id_usuario],
      (erro, results) => {
           conn.release()
           if(erro) return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
           if(results.length < 1){
             return res.status(404).json({
               mensagem: "Nenhum agendamento encontrado"
             })
           }
           return res.status(200).send(results)
      })
  })
};

const inserir_agendamento = (req, res) => {
  connection.getConnection((err, conn) => {
      if(err) return res.status(500).json({ mensagem: "Houve um erro!", erro: err })
      const QUERY = "INSERT INTO agendamentos (data_agendamento, horario, barbeiro, id_usuario) VALUES (?, ?, ?, ?);"
      conn.query(QUERY, [ req.body.data_agendamento, req.body.horario, req.body.barbeiro, req.body.id_usuario ],
          (erro, results) => {
              conn.release()
              if(erro) return res.status(500).json({ mensagem: "Houve um erro!", erro: erro })
              res.status(201).json({ mensagem: "Agendamento criado com sucesso!", id: results.insertId })
          })
  })
}

const apagar_agendamento = (req, res) => {

  connection.getConnection((err, conn) => {
      if(err) return res.status(500).json({ mensagem: "Houve um erro!", erro: err })
      conn.query(
          "DELETE FROM agendamentos WHERE id = ?;",
          [ req.body.id ],
          (erro, results) => {
              conn.release()
              if(erro) return res.status(500).json({ mensagem: "Houve um erro", erro: erro })
             return res.send({mensagem: "Agendamento excluido com sucesso!" })
          })

  })
}

module.exports = {
  listar_agendamentos,
    inserir_agendamento,
    listar_agendamento_id,
    apagar_agendamento,
    listar_agendamento_por_usuario
}
