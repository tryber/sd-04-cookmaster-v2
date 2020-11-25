const recipeModel = require('../model/recipeModel');

const create = async (request, response) => {
  const { _id } = request.user;
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    return response.status(400).send({ message: 'Invalid entries. Try again.' });
  }
  recipeModel
    .create({ name, ingredients, preparation, userId: _id })
    .then((recipe) => response.status(201).send({ recipe }))
    .catch(() =>
      response.status(422).send({ message: 'error creating recipe, try again' }));
};

const getAll = async (request, response) => {
  recipeModel
    .getAll()
    .then((recipes) => response.status(200).send(recipes))
    .catch(() =>
      response.status(422).send({ message: 'error creating recipe, try again' }));
};

const getById = async (request, response) => {
  const { id } = request.params;
  recipeModel
    .getById(id)
    .then((recipe) => response.status(200).send(recipe))
    .catch(() =>
      response.status(404).send({ message: 'recipe not found' }));
};

/* const update = async (request, response) => {
  const recipeId = request.params.id;
  const { _id: userId, role } = request.user;
console.log("cdcd", userId);

const recipe = await recipeModel.getById(recipeId);
console.log("re", recipe.userId);

if (userId.toString() !== recipe.userId.toString() && role !== 'admin') {
  return res.status(401).send({ message: 'Usuário não pode editar a receita' });
}
   productModel
    .update(id, productData)
    .then(() =>
      response
        .status(200)
        .json(response.json({ _id: id, name: productData.name, quantity: productData.quantity })));
};
*/
module.exports = { create, getAll, getById };
