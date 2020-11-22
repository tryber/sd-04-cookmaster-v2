const recipeModel = require('../models/genericModel');

const modelEdit = async (idR, body) => {
  try {
    await recipeModel.update('recipes', idR, body);
    return await recipeModel.findById('recipes', idR);
  } catch (err) {
    throw err;
  }
};

// const modelDelet = async (idR) => {
//   try {
//     await recipeModel.remove('recipes', idR);
//     const recipe = await recipeModel.findById('recipes', idR);
//     if (!recipe) return 'No body returned for response';
//     return 'erro ao deletar';
//   } catch (err) {
//     throw err;
//   }
// };

const updateAdmOrUser = async (idR, user, body) => {
  const { role, _id } = user;
  if (role === 'admin') return modelEdit(idR, body);
  const { userId } = await recipeModel.findById('recipes', idR);
  if (String(userId) === String(_id)) return modelEdit(idR, body);
  return null;
};

const deleteAdmOrUser = async (id) => {
  await recipeModel.remove(id);
};

module.exports = { updateAdmOrUser, deleteAdmOrUser };
