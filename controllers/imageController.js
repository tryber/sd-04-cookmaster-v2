const express = require('express');
const ImageModel = require('../models/recipeModel');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const image = await ImageModel.getImage(id);
  res.status(200).json(image);
});
