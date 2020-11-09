const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const createUser = async (req, res) => {
  const user = await usersModel.create(req.body, 'user');

  resp(res, 201, null, { user });
};

module.exports = {
  createUser,
};
