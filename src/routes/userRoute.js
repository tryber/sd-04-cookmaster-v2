const express = require('express');
const usersController = require('../controllers/usersController');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', userValidation, usersController.insertUser);

module.exports = router;
