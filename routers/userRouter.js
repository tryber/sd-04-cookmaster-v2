const express = require('express');
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/user');

const router = express.Router();

const { postUserController } = userController;
const { emailVerify, namePasswordEmailVerify } = middlewares;

router.post('/', namePasswordEmailVerify, emailVerify, postUserController);

module.exports = router;
