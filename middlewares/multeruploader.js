const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    const fileType = file.mimetype.split('/')[1];
    callback(null, `${req.params.id}.${fileType}`);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('image'),
  (req, _res, next) => {
    req.image = `localhost:3000/images/${req.file.filename}`;
    next();
  },
];
