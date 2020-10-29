const express = require('express');
// const loginValidator = require('../middlewares');

const router = express.Router();

// ROTA LOGIN

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(200).json(email, password);
  } catch (err) {
    console.log('rota login', err);
    res.status(400).json({ message: 'something gone wrong on login' });
  }
});

module.exports = router;
