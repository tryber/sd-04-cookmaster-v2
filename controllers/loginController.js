const express = require('express');
const validateAuth = require('../middlewares/middleAuthentication');
const creatToken = require('../authorization/createToken');

const router = express.Router();

// POST /login
router.post('/', validateAuth.userAuthentication, async (req, res) => {
  try {
    const { id, email, role } = req.user;
    const token = await creatToken({ id, email, role });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(501).json({ message: 'Falha ao criar token.' });
  }
});

module.exports = router;
