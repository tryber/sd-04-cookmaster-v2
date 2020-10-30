const connection = require('./connection');

const addRecipe = async (body) => {
  console.log('model body', body);
  const { name, ingredients, preparation, urlImage, userId } = body;
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, urlImage, userId }),
  );
  console.log('model recipe.ops', recipe);
  return recipe.ops[0];
};

module.exports = {
  addRecipe,
};
