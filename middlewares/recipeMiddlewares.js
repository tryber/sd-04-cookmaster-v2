const validateIngredients = (status, message) =>
  ({ body: { ingredients } }, res, next) => {
    if (!ingredients) return res.status(status).json({ message });

    next();
  };

const validatePreparation = (status, message) =>
  ({ body: { preparation } }, res, next) => {
    if (!preparation) return res.status(status).json({ message });

    next();
  };

module.exports = {
  validateIngredients,
  validatePreparation,
};
