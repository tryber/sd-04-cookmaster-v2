const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = { upload };
