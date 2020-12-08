const express = require('express');
const { validateToken } = require('../services/auth');
const { validateUser, validateRequiredFields } = require('../middlewares/recipeValidation');
const controller = require('../controllers/recipesController');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/', validateRequiredFields, validateToken, controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', validateUser, validateToken, controller.put);
router.delete('/:id', validateUser, validateToken, controller.delete);
router.put('/:id/image/', validateUser, validateToken, upload.single('image'), controller.putImage);

module.exports = router;
