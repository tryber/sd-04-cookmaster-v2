const { Router } = require('express');
const { loginUserController } = require('../controllers/userController');
const { userMiddlewares:
  { validateEmail, validatePassword },
} = require('../middlewares/index');

const loginRouter = Router();

const FILLED_FIELDS = 'All fields must be filled';

loginRouter.post('/', validateEmail(401, FILLED_FIELDS), validatePassword(401, FILLED_FIELDS), loginUserController);

module.exports = loginRouter;
