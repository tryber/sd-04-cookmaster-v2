// Inspired by Trybe lecture 28-2

const multer = require('multer');

const upload = multer({ dest: 'uploads' });

module.exports = [
  upload.single('image'),
  (req, res, next) => {
    next();
  },
];
