const express = require('express');
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/user');

const router = express.Router();

const { loginController } = userController;
const { emailPasswordVerify } = middlewares;

router.post('/', emailPasswordVerify, loginController);

module.exports = router;
