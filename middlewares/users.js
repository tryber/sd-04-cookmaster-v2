const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const createUser = async (req, res) => {
  const role = req.role === 'admin' ? 'admin' : 'user';
  const user = await usersModel.create(req.body, role);

  resp(res, 201, null, { user });
};

module.exports = {
  createUser,
};
