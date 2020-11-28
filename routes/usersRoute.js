const express = require('express');
const controller = require('../controllers/usersController');
const { requiredFields, validateEmail } = require('../middlewares/userValidations');

const router = express.Router();

router.post('/', requiredFields, validateEmail, controller.post);

module.exports = router;