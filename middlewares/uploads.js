const multer = require('multer');
const path = require('path');
const RecipeModel = require('../models/recipesModel');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
    // retorna a extensão do arquivo enviado.
    // callback(null, `${id}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('image'),
  async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { path } = req.file;
    const dirImage = `localhost:3000/${path}`;

    if (!user) {
      res.status(500).json({ message: 'Erro ao enviar a foto' });
    }

    await RecipeModel.updateImageRecipe(id, dirImage);
    const recipe = await RecipeModel.findById(id);
    return res.status(200).json(recipe);
  },
];
