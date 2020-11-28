const express = require('express');
const controller = require('../controllers/loginController');
const { requiredFields, validateEmailPassword } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', requiredFields, validateEmailPassword, controller.post);

module.exports = router;
