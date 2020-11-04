const createJWT = require('../auth/createJWT');
const createToken = require('../auth/createJWT');
const { findByEmail } = require('../model/usersModel');

module.exports = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);

    if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

    const user = await findByEmail(email);

    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Incorrect username or password' });

    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (_e) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
};
