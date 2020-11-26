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
    console.log('controller - login', user);
    console.log('controleer - user.password', user.password);
    if (!user || user.password !== password) {
      return res.status(401).json(messageJson2);
    }
    const token = createToken(user);
    console.log('controller-token', token);
    return res.status(200).json({ token });
  } catch (_e) {
    return res.status(401).json(messageJson2);
  }
};
