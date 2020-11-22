const emailRegex = (email) => /\S+@\S+\.\S+/.test(email);

const validateName = (status, message) =>
  (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(status).json({ message });

    next();
  };

const validateEmail = (status, message) =>
  (req, res, next) => {
    const { email } = req.body;
    const regexVerify = emailRegex(email);

    if (!email || !regexVerify) return res.status(status).json({ message });

    next();
  };

const validatePassword = (status, message) =>
  (req, res, next) => {
    const { password } = req.body;

    if (!password) return res.status(status).json({ message });

    next();
  };

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
