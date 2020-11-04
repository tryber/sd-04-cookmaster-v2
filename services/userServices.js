const invalideEntries = (res) => {
  res.status(400).json({ message: 'Invalid entries. Try again.' });
};

const alreadyExistEmail = (res) => {
  res.status(409).json({ message: 'Email already registered' });
};

const incorrectEmailOrPassword = (res) => {
  res.status(401).json({ message: 'Incorrect username or password' });
};

const emptyFields = (res) => {
  res.status(401).json({ message: 'All fields must be filled' });
};

const recipeNotFOund = (res) => {
  res.status(404).json({ message: 'recipe not found' });
};
module.exports = {
  invalideEntries,
  alreadyExistEmail,
  incorrectEmailOrPassword,
  emptyFields,
  recipeNotFOund,
};
