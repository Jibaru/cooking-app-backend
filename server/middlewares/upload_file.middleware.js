const multer = require("multer");
const path = require("path");
const { validator } = require("express-validator");
const uploadsDir = path.resolve('resources/static/assets/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const checkFile = (req, res, next) => {
  if (req.file === undefined || req.file === null) {
    req.errors = req.errors || [];
    req.errors.push({
      "value": null,
      "msg": "No existe el archivo",
      "param": "file",
      "location": "body"
    });
    console.log(req.file);
  }
  next();
}

const uploadFile = multer({ storage: storage });

module.exports = {
  uploadFile,
  checkFile
};