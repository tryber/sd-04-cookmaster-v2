const recipeModel = require('../models/genericModel');

const updateAdm = async (idR, user, body) => {
  const {role, _id} = user;
  if (role === 'admin') {
    try {
      await recipeModel.update('recipes', idR, body);
      return await recipeModel.findById('recipes', idR);
    } catch (err) {
      throw err;
    }
  } else {
    const {userId} = await recipeModel.findById('recipes', idR);
    if (String(userId) === String(_id)) {
      try {
        await recipeModel.update('recipes', idR, body);
        return await recipeModel.findById('recipes', idR);
      } catch (err) {
        throw err;
      }
    }
  }
};

module.exports = { updateAdm };
