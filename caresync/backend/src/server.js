const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); //importar conexão

const app = express();

app.use(cors());
app.use(express.json());

// testar conexão com banco
pool.connect()
  .then(() => console.log("Banco conectado com sucesso"))
  .catch(err => console.error("Erro ao conectar no banco", err));

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API CareSync funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});