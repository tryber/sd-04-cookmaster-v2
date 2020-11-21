const recipeModel = require('../models/genericModel');

const model = async (idR, body) => {
  try {
    await recipeModel.update('recipes', idR, body);
    return await recipeModel.findById('recipes', idR);
  } catch (err) {
    throw err;
  }
};

const updateAdm = async (idR, user, body) => {
  const { role, _id } = user;
  if (role === 'admin') model(idR, body);
  else {
    const { userId } = await recipeModel.findById('recipes', idR);
    if (String(userId) === String(_id)) return model(idR, body);
    return null;
  }
};

module.exports = { updateAdm };
