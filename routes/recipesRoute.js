const express = require('express');
const { validateToken } = require('../services/auth');
const { validateUser, requiredFields } = require('../middlewares/recipeValidation');

const router = express.Router();
const controller = require('../controllers/recipesController');

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.post('/', requiredFields, validateToken, controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', validateUser, validateToken, controller.put);
router.delete('/:id', validateUser, validateToken, controller.delete);
router.put('/:id/image/', validateUser, validateToken, upload.single('image'), controller.putImage);

module.exports = router;
