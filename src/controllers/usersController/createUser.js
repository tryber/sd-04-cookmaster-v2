const { userModels } = require('../../model');
const { HTTPStatus } = require('../../config');
const { errorsMessages } = require('../../service');

const createUserController = async (req, res) => {
  try {
    const data = req.body;

    const userCreate = await userModels.createUserModel(data);

    return res.status(HTTPStatus.CREATED).json(userCreate);
  } catch (err) {
    console.error('createUserController', err.message);
    return errorsMessages(res);
  }
};

module.exports = createUserController;
