const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const fileName = id;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

const uploadImage = () => {
  upload.single('image')
};

module.exports = {
  uploadImage,
};
