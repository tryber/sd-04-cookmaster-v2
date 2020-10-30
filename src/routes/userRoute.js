const express = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', userValidation, userController.insertUser);

module.exports = router;
