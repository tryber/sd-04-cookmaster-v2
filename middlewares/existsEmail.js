const User = require('../models/User');

const getEmail = async (email) => User.findEmail(email);

const validationExistsEmail = async (req, res, next) => {
  const emailForSearch = req.body.email;
  const user = await getEmail(emailForSearch);

  if (user && req.baseUrl === '/users') return res.status(409).json({ message: 'Email already registered'});
  if (!user && req.baseUrl === '/login') return res.status(401).json({ message: 'Incorrect username or password'});
  if (user) {
    const { _id, email } = user; 
    req.user = { _id, email };
  }
  
  return next();
};

module.exports = {
  validationExistsEmail,
};
