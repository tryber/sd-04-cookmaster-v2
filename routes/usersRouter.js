const { Router } = require('express');
const controller = require('../controllers/usersController');
const middleware = require('../middleware/validateUsers');
const validateJWT = require('../middleware/validateJwt');


const usersRouter = Router();

usersRouter.post('/', middleware.validateUser, controller.postCreateUsersCont);
usersRouter.post('/admin', validateJWT, controller.postCreateAdminCont);

module.exports = usersRouter;
