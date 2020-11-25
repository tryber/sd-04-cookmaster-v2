const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipeInsert = async (recipe) => {
  const schema = await connection();
  const newRecipe = await schema.collection('recipes').insertOne(recipe);

  return newRecipe.ops[0];
};

const findRecipeList = async () => {
  const schema = await connection();
  const recipeList = await schema.collection('recipes').find({}).toArray();

  return recipeList;
};

const findRecipeById = async (id) => {
  const schema = await connection();
  const recipeList = await schema.collection('recipes').findOne(ObjectId(id));

  return recipeList;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const schema = await connection();
  const newRecipe = await schema.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );

  return newRecipe.value;
};

const deleteRecipe = async (id) => {
  const schema = await connection();
  await schema.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return true;
};

const insertImage = async (id, url) => {
  const schema = await connection();
  const newRecipe = await schema.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image: url } },
      { returnOriginal: false },
    );

  return newRecipe.value;
};

module.exports = {
  recipeInsert,
  findRecipeList,
  findRecipeById,
  editRecipe,
  deleteRecipe,
  insertImage,
};
