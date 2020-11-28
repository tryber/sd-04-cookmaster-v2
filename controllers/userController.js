const userModel = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.addUser(name, email, password);
    //  console.log({user});
    return res.status(201).json({user});
  } catch (_err) {
    res.status(500).json({ message: 'Error in controller register' });
  }
};

module.exports = { register };
