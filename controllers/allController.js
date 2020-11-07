const { getAll, getRecipeById, searchRecipeModel, newRecipeInsert, updateRecipeModel, getRecipeByUser, deleteModel } = require('../models/allModels');
const { findById } = require('../models/userModel');

const listRecipes = async (_req, res) => {
  const recipes = await getAll();

  return res.status(200).json({ recipes });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  if(!recipe) {
    res.status(404).jason({ message: 'recipe not found' });
  }

  return res.status(200).json({ recipe });
};

const NewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.params;
  
  if(!name || !ingredients || !preparation) {
    return res.status(400).json({ message: "Invalid entries. Try again." });
  }
   const recipe = await newRecipeInsert({ name, ingredients, preparation, userId});
   return res.status(201).json({ recipe });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: null, user: req.user });

  const recipes = await searchRecipeModel(q);
  return res.render('search', { recipes, user: req.user });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  res.render('editRecipe', { recipe, user: req.user });
};

const updateRecipe = async (req, res) => {
  const { nameRec, ingredients, instructions } = req.body;
  const { id } = req.params;

  await updateRecipeModel(id, nameRec, ingredients, instructions);
  res.redirect('/');
};

const myRecipes = async (req, res) => {
  const { id } = req.user;

  const recipes = await getRecipeByUser(id);

  res.render('myRecipes', { recipes, user: req.user });
};

const deleteRecipePage = async (req, res) => {
  const recipe = req.params;

  res.render('deleteRecipe', { message: null, recipe, user: req.user });
};

const deleteRecipe = async (req, res) => {
  const { confirmPassword } = req.body;
  const recipe = req.params;
  const { id } = req.user;

  const completeUser = await findById(id);
  const { password } = completeUser;

  if (password !== confirmPassword) {
    res.render('deleteRecipe', { message: 'Senha Incorreta.', recipe, user: req.user });
  }

  await deleteModel(recipe.id);
  res.redirect('/');
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipe,
  NewRecipe,
  editRecipe,
  updateRecipe,
  myRecipes,
  deleteRecipePage,
  deleteRecipe,
};
