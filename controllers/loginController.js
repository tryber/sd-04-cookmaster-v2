const login = (req, res) => {
  const { token } = req;

  res.status(200).json({ token });
};

module.exports = {
  login,
};
