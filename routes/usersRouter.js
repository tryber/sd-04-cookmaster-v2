const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middleware');

const usersRouter = Router();

usersRouter.post('/', middleware.validateUsers, controller.postCreateUsersCont);
usersRouter.post('/admin', middleware.validateJWT, controller.postCreateAdminCont);

module.exports = usersRouter;
