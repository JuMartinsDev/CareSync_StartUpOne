const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =========================
// REGISTRO
// =========================
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // verificar se usuário já existe
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ erro: "Usuário já cadastrado" });
    }

    // gerar hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senhaHash]
    );

    res.status(201).json(resultado.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
};


// =========================
// LOGIN
// =========================
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuario.rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.rows[0].senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.rows[0].id },
      "segredo_super_secreto",
      { expiresIn: "1h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro no login" });
  }
};