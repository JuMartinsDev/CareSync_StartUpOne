const pool = require("../config/db");

// =========================
// Criar Paciente
// =========================
exports.criarPaciente = async (req, res) => {
  const { nome, data_nascimento, observacoes } = req.body;

  try {
    const resultado = await pool.query(
      `INSERT INTO pacientes (nome, data_nascimento, observacoes, criado_por)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, data_nascimento, observacoes, req.userId]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar paciente" });
  }
};

// =========================
// Listar Pacientes do Usuário
// =========================
exports.listarPacientes = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM pacientes WHERE criado_por = $1 ORDER BY id DESC",
      [req.userId]
    );

    res.json(resultado.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar pacientes" });
  }
};