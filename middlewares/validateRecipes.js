const createMessage = (message) => ({ message });

const validateFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (name && ingredients && preparation) return next();

  return res.status(400).json(createMessage('Invalid entries. Try again.'));
};

module.exports = {
  validateFields,
};
