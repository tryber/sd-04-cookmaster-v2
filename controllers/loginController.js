const validador = require('../service/validador');
const createJWT = require('../service/createJWT');
const userModel = require('../models/usersModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await validador.schemaLogin.validate({ email, password });
    const user = await userModel.getUserByEmail(email);
    if (user) {
      const { password: _, ...userS } = user;
      const token = createJWT(userS);
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Incorrect username or password' });
  } catch (erro) {
    return res.status(401).json({ message: `${erro.errors[0]}` });
  }
};

module.exports = {
  loginUser,
};
