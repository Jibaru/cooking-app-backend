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

const checkFileWithParamName = (paramName) => {
  return  (req, res, next) => {
    if (req.file === undefined || req.file === null) {
      req.errors = req.errors || [];
      req.errors.push(toErrorFormat(
        {
          value: req.file,
          msg: isRequiredErrorMessage(paramName),
          param: paramName,
          location: 'body'
        }
      ));
    }
    next();
  };
}

const appendFilesToBody = (req, res, next) => {
  if (!!req.file) {
    req.body[req.file.fieldname] = req.file.originalname;
  }

  if (!!req.files) {
    req.files.forEach(fileElement => {
      req.body[fileElement.fieldname] = fileElement.originalname;
    });
  }

  next();
}

const uploadFile = multer({ storage: storage });

module.exports = {
  uploadFile,
  checkFile,
  checkFileWithParamName,
  appendFilesToBody
};