const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images',
  filename: ({ params: { id } }, _file, callback) => {
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
