module.exports = async (req, res, next) => {
  const { role: userRole } = req.user;

  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  next();
};
