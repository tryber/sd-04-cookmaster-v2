const isValidUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const exist = await findByEmail(email);

  if (!name || !email || !password || emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (exist.length > 0) return res.status(409).json({ message: 'Email already registered'});

  next();
};

module.exports = {
  isValidUser,
}