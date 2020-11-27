const multer = require('multer');
const path = require('path');
const { cwd } = require('process');

const storage = multer.diskStorage({
  destination: path.join(cwd(), 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = upload;
