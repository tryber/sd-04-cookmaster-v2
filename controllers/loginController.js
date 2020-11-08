const router = require('express').Router();
const createToken = require('../auth/createJWT');
const middlewares = require('../middlewares/validateUsers');

router.post('/',
  middlewares.validateLoginFields,
  middlewares.validateLogin,
  (req, res) => {
    const token = createToken(req.user);
    res.status(200).json({ token });
  });

module.exports = router;
