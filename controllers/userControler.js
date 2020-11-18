const { Router } = require('express');
const { userService } = require('../service');

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.createUser(name, email, password);

  if (newUser.error) return res.status(newUser.status).json(newUser.err);
  return res.status(201).json(newUser);
});

module.exports = router;
