const validador = require('../service/validador');
const createJWT = require('../service/createJWT');
const userModel = require('../models/usersModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const teste = await validador.testeVa.validate({ email, password });
    const valida = await validador.schemaLogin.validate({ email, password });
    if (valida) {
      const user = await userModel.getUserByEmail(email);
      if (user) {
        if (password === user.password || email === user.email) {
          const { password: _, ...userS } = user;
          const token = createJWT(userS);
          return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (erro) {
    // console.log('errorrrrrrrrrrr', erro);
    return res.status(401).json({ message: `${erro.errors[0]}` });
  }
};

module.exports = {
  loginUser,
};
