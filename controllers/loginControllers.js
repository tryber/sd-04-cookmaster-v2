const loginRouter = require('express').Router();
const JWT = require('../middlewares/JWT');
const middlewares = require('../middlewares/validateUsers');

loginRouter.post('/',
  middlewares.validateLoginFields,
  middlewares.validateLogin, (req, res) => {
    const token = JWT.createToken(req.user);
    res.status(200).json({ token });
  });

module.exports = loginRouter;
