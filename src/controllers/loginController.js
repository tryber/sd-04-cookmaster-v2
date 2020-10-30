const authenticate = require('../auth/authentication');
const { ERR_USER_NOT_FOUND, ERR_INVALID_PASSWORD } = require('../utils/errorTypes');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authenticate.login(email, password);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    if (err.message === ERR_USER_NOT_FOUND || err.message === ERR_INVALID_PASSWORD) {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  }
};

module.exports = {
  login,
};
