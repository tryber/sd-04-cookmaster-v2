const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middleware');

const usersRouter = Router();

usersRouter.post('/', middleware.validateUsers, usersController.postCreateUsersCont);
usersRouter.post('/admin', middleware.validateJWT, usersController.postCreateAdminCont);

module.exports = usersRouter;
