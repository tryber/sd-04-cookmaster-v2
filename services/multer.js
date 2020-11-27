const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const fileType = file.mimetype.split('/')[1];
    console.log(req.params.id);
    callback(null, `${req.params.id}.${fileType}`);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('image'),
  (req, res, next) => {
    req.image = `localhost:3000/images/${req.file.filename}`;
    console.log(req.image);
    next();
  },
];
