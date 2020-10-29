const isValid = (name, email, password, res) => {
  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!email || !password || !name || validaEmail === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
};

module.exports = {
  isValid,
};
