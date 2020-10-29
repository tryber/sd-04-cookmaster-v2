const invalideEntries = (res) => {
  res.status(400).json({ message: 'Invalid entries. Try again.' });
};

const alreadyExistEmail = (res) => {
  res.status(409).json({ message: 'Email already registered' });
};

module.exports = {
  invalideEntries,
  alreadyExistEmail,
};
