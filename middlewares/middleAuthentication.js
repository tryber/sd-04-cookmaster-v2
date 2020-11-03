const userModel = require('../models/usersModel');

const userAuthentication = async (req, res, next) => {
  const { email, password } = req.body;

  // console.log('password' + password);
  const existEmail = await userModel.findByEmail(email);

  if (typeof password === 'undefined' || typeof email === 'undefined') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!existEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  // console.log(existEmail.user.password);
  if (existEmail.user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  // Construindo novo objeto
  const user = {
    id: existEmail.id,
    email: existEmail.user.email,
    role: existEmail.user.role,
  };

  req.user = user;

  next();
};

module.exports = { userAuthentication };
