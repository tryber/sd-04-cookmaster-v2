// Inspired by Trybe lecture 28-2

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('image'),
  (req, res, next) => {
    next();
  },
];
