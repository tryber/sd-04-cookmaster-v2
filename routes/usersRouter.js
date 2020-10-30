const { Router } = require('express');
const controller = require('../controllers/usersController');
const middleware = require('../middleware/validateUsers')

const usersRouter = Router();

usersRouter.post('/', middleware.validateUser, controller.postCreateUsersCont);

module.exports = usersRouter;
