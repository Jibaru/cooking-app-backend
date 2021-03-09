const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const {
  createUserNotificationMiddleware,
  deleteUserNotificationMiddleware,
  getAllUserNotificationsMiddleware,
  updateUserNotificationMiddleware,
} = require("../middlewares/user_notification.middlewares");

/// UserNotification Services
app.get(
  "/user-notifications",
  [getAllUserNotificationsMiddleware, validateErrors],
  require("../controllers/user_notification/get_all.controller")
);

app.post(
  "/user-notifications",
  [createUserNotificationMiddleware, validateErrors],
  require("../controllers/user_notification/create.controller")
);

app.put(
  "/user-notifications/:id",
  [updateUserNotificationMiddleware, validateErrors],
  require("../controllers/user_notification/update.controller")
);

app.delete(
  "/user-notifications/:id",
  [deleteUserNotificationMiddleware, validateErrors],
  require("../controllers/user_notification/delete.controller")
);

module.exports = app;
