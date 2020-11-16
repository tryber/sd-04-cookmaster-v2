const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ storage }).single('image');

module.exports = uploadImage;
