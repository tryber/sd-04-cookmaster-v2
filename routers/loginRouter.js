const express = require('express');

const loginController = require('../controllers/loginController');
const loginMiddleware = require('../middleware/userValidate');

const router = express.Router();

router.post('/', loginMiddleware.validaLogin, loginController.login);

module.exports = router;
