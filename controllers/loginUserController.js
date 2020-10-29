const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { token } = req;

  res.status(200).json({ token });
});

module.exports = router;
