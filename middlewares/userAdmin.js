const User = require('../models/User');

const getEmail = async (email) => User.findEmail(email);

const validationIsAdmin = async (req, res, next) => {
  const emailForSearch = req.user.email;
  const user = await getEmail(emailForSearch);
  console.log(req.body, 'result', user)
  if(!req.user || !user || user.role !== 'admin') return res.status(403).json({ message: 'Only admins can register new admins'});

  return next();
};

module.exports = {
  validationIsAdmin,
};
