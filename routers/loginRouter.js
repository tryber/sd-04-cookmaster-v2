const express = require('express');
const middlewares = require('../middlewares');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/',
  middlewares.validationData.validationFields,
  middlewares.existsEmail.validationExistsEmail,
  sessionController.login
);

module.exports = router;
