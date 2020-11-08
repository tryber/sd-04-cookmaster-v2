const express = require('express');
const rescue = require('express-rescue');
const { createUserVal, createUser } = require('../middlewares');

const router = express.Router();

router.post('/', rescue(createUserVal), rescue(createUser));

module.exports = router;
