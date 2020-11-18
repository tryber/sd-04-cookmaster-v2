const INVALID_ENTRIES = 'Invalid entries. Try again.';
const emailRegex = (email) => /\S+@\S+\.\S+/.test(email);

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: INVALID_ENTRIES });

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexVerify = emailRegex(email);

  if (!email || !regexVerify) return res.status(400).json({ message: INVALID_ENTRIES });

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.json({ message: INVALID_ENTRIES });

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
