const { createToken } = require('../../service');
const { HTTPStatus } = require('../../config');
const { userModels } = require('../../model');
const { errorsMessages } = require('../../service');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModels.getByEmailModel(email);

    if (!user || user.email !== email || user.password !== password) {
      return errorsMessages(res, 'Incorrect username or password', 'unauthorized');
    }

    const { password: _, ...userData } = user;

    const token = createToken(userData);

    return res.status(HTTPStatus.OK).json({ token });
  } catch (err) {
    console.error('loginController', err);
    return errorsMessages(res);
  }
};

module.exports = loginController;
