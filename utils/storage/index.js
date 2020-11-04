const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `localhost:3000/images/${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
