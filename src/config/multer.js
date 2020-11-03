const multer = require('multer');
const path = require('path');
const { ERR_INVALID_FILE_TYPE } = require('../utils/errorTypes');

module.exports = {
  dest: path.join(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, _file, cb) => {
      const { id: recipeId } = req.params;
      cb(null, `${recipeId}.jpeg`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/jpg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(ERR_INVALID_FILE_TYPE));
    }
  },
};
