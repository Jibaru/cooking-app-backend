'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('UserNotification', {
    subject: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateTimeSended: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dateTimeViewed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'UserNotifications',
    timestamps: false
  });
  UserNotification.associate = function(models) {
    // associations can be defined here
    UserNotification.belongsTo(models.User, {
      as: 'user'
    });
  };
  return UserNotification;
};