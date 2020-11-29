const validateToken = require('../auth/validateToken');

const buildResponse = (message) => {
  const resp = { message };
  return resp;
};

const validateAuthenticity = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const user = validateToken(token);
    req.user = user;

    next();
  } catch (_err) {
    res.status(401).json(buildResponse('jwt malformed'));
  }
};

const validateFields = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  next();
};

module.exports = {
  validateAuthenticity,
  validateFields,
};
