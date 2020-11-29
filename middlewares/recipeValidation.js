const register = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  if (!name || !ingredients || !preparation || !user) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  return next();
};

module.exports = { register };
