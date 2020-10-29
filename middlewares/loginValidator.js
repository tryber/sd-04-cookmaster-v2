const responseMessage = (message) => ({ message });

const validateEmailAndPasswordLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json(responseMessage('All fields must be filled'));
  }
  const isEmailValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);
  if (!isEmailValid) {
    return res.status(401).json(responseMessage('Incorrect username or password'));
  }
  next();
};

module.exports = {
  responseMessage,
  validateEmailAndPasswordLogin,
};
