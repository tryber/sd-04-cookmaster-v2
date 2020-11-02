const message = 'Invalid entries. Try again.';

const existingElements = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) res.status(400).json({ message });
  next();
};

module.exports = {
  existingElements,
};
