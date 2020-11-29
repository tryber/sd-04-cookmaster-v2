const createToken = require('../auth/createJWT');
// const createJWT = require('../auth/createJWT');

// importando o userModel do model
const userModel = require('../models/userModel');

const messageJson1 = { message: 'All fields must be filled' }; // jogar o json na variavel
const messageJson2 = { message: 'Incorrect username or password' }; // jogar o json na variavel

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json(messageJson1);
    }
    const user = await userModel.findEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json(messageJson2);
    }
    // tirando a senha do payload
    const { password: _, ...userWhitoutPassword } = user;
    const token = createToken(userWhitoutPassword);
    return res.status(200).json({ token });
  } catch (_e) {
    return res.status(401).json(messageJson2);
  }
};
