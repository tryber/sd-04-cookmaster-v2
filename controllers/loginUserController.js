const express = require('express');
const createToken = require('../middleware/userAuthentication');

const router = express.Router();

router.post('/', (req, res) => {
  const token = createToken(req.user);

  res.status(200).json({ token });
});

module.exports = router;
