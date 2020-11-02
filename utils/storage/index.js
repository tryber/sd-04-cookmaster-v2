const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (_req, _file, callback, id) => {
    callback(null, id);
  },
});

module.exports = storage;
