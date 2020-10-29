const usersModel = require('../models/usersModel');

const insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const insertedUser = await usersModel.insertUser(name, email, password);
    res.status(201).json(insertedUser);
  } catch (_err) {
    console.error(_err);
  }
};

module.exports = {
  insertUser,
};
