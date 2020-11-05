// Validações - Cadastro
const requiredFields = (req, res, next) => {
  const { name, preparation, ingredients } = req.body;

  if (!name || !preparation || !ingredients) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  requiredFields,
};
