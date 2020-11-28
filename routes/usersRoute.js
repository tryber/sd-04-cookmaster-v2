const express = require('express');
const controller = require('../controllers/usersController');
const { validateRequiredFields, validateEmail } = require('../middlewares/userValidations');

const router = express.Router();

router.post('/', validateRequiredFields, validateEmail, controller.post);

module.exports = router;
