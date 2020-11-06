const userModel = require('../models/usersModel');
const validador = require('../service/validador');

// validar dados da req e adicionar usuario
const addUserController = async (req, res) => {
  const { body } = req;
  if (!body.role) body.role = 'user';
  const { name: nome, email, password } = body;
  try {
    const valida = await validador.schemaAdd.validate({ name: nome, email, password });
    if (valida) {
      const checkEmail = await userModel.getUserByEmail(body.email);
      if (!checkEmail) {
        const userAdd = await userModel.addUser(body);
        const { password: _, ...userS } = userAdd;
        return res.status(201).json({ user: userS });
      }
      return res.status(409).json({ message: 'Email already registered' });
    }
  } catch (erro) {
    return res.status(400).json({ message: `${erro.errors[0]}` });
  }
};

// rota de logina

module.exports = {
  addUserController,
};
