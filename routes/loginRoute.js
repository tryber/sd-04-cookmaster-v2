const express = require('express');
const controller = require('../controllers/loginController');
const { validateRequiredFields, validateEmailPassword } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', validateRequiredFields, validateEmailPassword, controller.post);

module.exports = router;
