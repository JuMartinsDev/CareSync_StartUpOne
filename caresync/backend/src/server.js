const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API CareSync funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});