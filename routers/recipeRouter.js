const express = require('express');
const middlewares = require('../middlewares');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.post('/',
  middlewares.validationData.validationFields,
  middlewares.auth.validationAuth,
  recipeController.add,
);

router.get('/',
  recipeController.getAll,
);

router.get('/:id',
  recipeController.getOne,
);

router.put('/:id',
  middlewares.auth.validationAuth,
  recipeController.update,
);

router.delete('/:id',
  middlewares.auth.validationAuth,
  recipeController.remove,
);

router.put('/:id/image',
  middlewares.auth.validationAuth,
  middlewares.uploadImage,
  recipeController.update,
);

module.exports = router;
