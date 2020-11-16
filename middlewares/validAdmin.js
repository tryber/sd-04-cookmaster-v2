const usersModel = require('../models/usersModel');

const validAdmin = async (req, res, next) => {
  const { user } = req;
  console.log(user);
  const isAdmin = await usersModel.getUserByMail(user.email);

  if (isAdmin.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  req.user.role = 'admin';
  next();
};

module.exports = validAdmin;
