const rescue = require('express-rescue');
const multer = require('multer');
const { recipesModel } = require('../models');

const postCreateRecipesCont = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await recipesModel.postCreateRecipesMod(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe: result });
});

const getAllRecipesCont = rescue(async (_req, res) => {
  const result = await recipesModel.getAllRecipesMod();

  return res.status(200).json(result);
});

const getByIdRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await recipesModel.getByIdRecipesMod(id);
  if (!result) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(result);
});

const updateRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const result = await recipesModel.updateRecipesMod(id, name, ingredients, preparation);

  return res.status(200).json(result);
});

const deleteRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await recipesModel.deleteRecipesMod(id);

  return res.status(204).json(result);
});

// Upload da Imagem, substituindo o nome da imagem pelo ID.
// O path é um modulo nativo do Node para manipular caminhos de arquivos e pastas.
// O _dirname é o caminho da pasta onde o arquivo será salvo.

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const updateImageRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `localhost:3000/images/${filename}`;

  const recipe = await recipesModel.getByIdRecipesMod(id);

  const result = await recipesModel.updateImageRecipesMod(id, imagePath, recipe);

  return res.status(200).json(result);
});

module.exports = {
  postCreateRecipesCont,
  getAllRecipesCont,
  getByIdRecipesCont,
  updateRecipesCont,
  deleteRecipesCont,
  upload,
  updateImageRecipesCont,
};
