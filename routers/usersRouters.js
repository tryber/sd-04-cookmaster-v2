const express = require('express');

const userController = require('../controllers/userControllers');
const userMiddleware = require('../middleware/userValidate');

const router = express.Router();

router.post('/', userMiddleware.validaUser, userController.cadUser);

module.exports = router;
