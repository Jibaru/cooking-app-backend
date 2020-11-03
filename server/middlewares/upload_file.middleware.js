const multer = require("multer");
const path = require("path");
const { isRequiredErrorMessage } = require('../utils/error_templates');
const { toErrorFormat } = require('../utils/error_formatter');
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
    req.errors.push(toErrorFormat(
      {
        value: req.file,
        msg: isRequiredErrorMessage('file'),
        param: 'file',
        location: 'body'
      }
    ));
  }
  next();
}

const uploadFile = multer({ storage: storage });

module.exports = {
  uploadFile,
  checkFile
};