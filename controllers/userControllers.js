const userModel = require('../model/userModel');

const cadUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.cadUser(name, email, password);

    res.status(201).json({ user });
  } catch (error) {
    console.error('Erro user get', error);
  }
};

module.exports = {
  cadUser,
};
