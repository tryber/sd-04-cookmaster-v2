const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

const storeImage = async (req, _res, next) => {
  req.body.image = `${req.headers.host}/${req.file.path}`;

  return next();
};

module.exports = [
  upload.single('image'),
  storeImage,
];
