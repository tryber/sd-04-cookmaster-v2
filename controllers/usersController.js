const express = require('express');
const model = require('../models/usersModel');

const router = express.Router();

router.get('/', async (_, res) => {
  const users = await model.getAll();
  res.status(200).json({ users });
});

module.exports = router;
