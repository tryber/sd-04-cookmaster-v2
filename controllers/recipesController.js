const express = require('express');
const rescue = require('express-rescue');
const { jwtVal } = require('../helpers/jwt');
const multer = require('multer');
const { createRecipeVal, createRecipe, readRecipeVal, readRecipe, readRecipes,
  updateOrDeleteRecipeVal, updateRecipe, updateImgRecipe, deleteRecipe } = require('../middlewares');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const id = req.params.id;
    const ext = file.mimetype.split('/')[1];
    cb(null, `${id}.${ext}`);
  },
});
const upload = multer({ storage });

router.get('/', rescue(readRecipes));
router.post('/', jwtVal, createRecipeVal, rescue(createRecipe));

router.get('/:id', rescue(readRecipeVal), readRecipe);
router.put('/:id', jwtVal, rescue(updateOrDeleteRecipeVal), rescue(updateRecipe));
router.delete('/:id', jwtVal, rescue(updateOrDeleteRecipeVal), rescue(deleteRecipe));

router.put(
  '/:id/image',
  jwtVal,
  upload.single('image'),
  rescue(updateOrDeleteRecipeVal),
  rescue(updateImgRecipe),
);

module.exports = router;
