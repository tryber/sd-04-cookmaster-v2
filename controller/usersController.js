const { userModels } = require('../model');
const { errorsMessages } = require('../service');

const createUserController = async (req, res) => {
  try {
    const data = req.body;

    const userCreate = await userModels.createUserModel(data);

    return res.status(201).json(userCreate);
  } catch (err) {
    console.error('createUserController', err.message);
    return errorsMessages(res);
  }
};

module.exports = {
  createUserController,
};
