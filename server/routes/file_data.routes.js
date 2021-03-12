const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const {
  uploadFile,
  checkFile,
} = require("../middlewares/upload_file.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  getOneFileDataMiddleware,
  updateFileDataMiddleware,
} = require("../middlewares/file_data.middlewares");

/// FileData Services
app.get(
  "/file-data/:id",
  [getOneFileDataMiddleware, validateErrors],
  require("../controllers/file_data/get_one.controller")
);

app.put(
  "/file-data/:id",
  [
    checkToken,
    updateFileDataMiddleware,
    uploadFile.single("file"),
    checkFile,
    validateErrors,
  ],
  require("../controllers/file_data/update.controller")
);

app.post(
  "/file-data",
  [checkToken, uploadFile.single("file"), checkFile, validateErrors],
  require("../controllers/file_data/create.controller")
);

module.exports = app;
