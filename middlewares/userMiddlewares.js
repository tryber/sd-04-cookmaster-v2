const emailRegex = (email) => /\S+@\S+\.\S+/.test(email);

const validateName = (message) =>
  (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message });

    next();
  };

const validateEmail = (message) =>
  (req, res, next) => {
    const { email } = req.body;
    const regexVerify = emailRegex(email);

    if (!email || !regexVerify) return res.status(400).json({ message });

    next();
  };

const validatePassword = (message) =>
  (req, res, next) => {
    const { password } = req.body;

    if (!password) return res.json({ message });

    next();
  };

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
