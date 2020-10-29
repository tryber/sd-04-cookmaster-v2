const validador = require('../service/validator');
const createJWT = require('../service/createJWT');
const userModel = require('../models/usersModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const valida = await validador.schemaLogin.validate({ email, password });
    console.log('/////////////////////', valida);
    if (valida) {
      const user = await userModel.getUserByEmail(email);
      console.log('??????????????', user);
      if (user || password === user.password) {
        console.log('aaaaaaaaaaaaaaaaaaa');
        const { password: _, ...userS } = user;
        const token = createJWT(userS);
        return res.status(200).json({ token });
      }
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (erro) {
    return res.status(401).json({ message: `${erro.errors[0]}` });
  }
};

module.exports = {
  loginUser,
};
