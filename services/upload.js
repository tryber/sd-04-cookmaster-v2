// Middleware para tratar upload de arquivos

const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;