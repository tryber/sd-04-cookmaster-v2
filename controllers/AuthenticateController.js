const userModel = require('../model/UserModel');
const bcryptjs = require('bcryptjs');
const { GenerateToken } = require('../utils/GenerateToken');

const index = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(401).send({ message: 'All fields must be filled' });
  }

  try {
    const user = await userModel.findByEmail(email);

    if (!(await bcryptjs.compare(password, user.password))) {
      return response.status(401).send({ message: 'Incorrect username or password' });
    }
    // para os testes passarem
    /* if (!user || password !== user.password) {
      return res.status(401).send({ message: 'Incorrect username or password' });
    } */

    user.password = undefined;

    return response.status(200).json({ user, token: 'Bearer ' + GenerateToken(user) });

  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};

module.exports = { index };
