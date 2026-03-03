const express = require("express");
const router = express.Router();
const PacienteController = require("../controllers/PacienteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, PacienteController.criarPaciente);
router.get("/", authMiddleware, PacienteController.listarPacientes);

module.exports = router;