const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'images',

  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);

    // const recipesId = await recipesModel.findRecipeId(id);

    // const image = `localhost:3000/image/${id}.jpeg`;
    // return image;
    // recipesId['image'] = image;

    // const imageAdd = await addImage.addImage(id, image);
    // console.log(imageAdd);
    // return next();
  },
});
const upload = multer({ storage });

module.exports = upload;
