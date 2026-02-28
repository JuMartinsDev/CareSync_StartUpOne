const bcrypt = require("bcrypt");
const User = require("../models/User");

class UserController {
  static async register(req, res) {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create(nome, email, senhaHash);

    res.json(user);
  }
}

module.exports = UserController;