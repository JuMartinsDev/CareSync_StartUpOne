const pool = require("../config/db");

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
};