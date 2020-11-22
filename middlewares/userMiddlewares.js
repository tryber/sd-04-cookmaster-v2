const emailRegex = (email) => /\S+@\S+\.\S+/.test(email);

const validateName = (status, message) =>
  ({ body: { name } }, res, next) => {
    if (!name) return res.status(status).json({ message });

    next();
  };

const validateEmail = (status, message) =>
  ({ body: { email } }, res, next) => {
    const regexVerify = emailRegex(email);

    if (!email || !regexVerify) return res.status(status).json({ message });

    next();
  };

const validatePassword = (status, message) =>
  ({ body: { password } }, res, next) => {
    if (!password) return res.status(status).json({ message });

    next();
  };

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
