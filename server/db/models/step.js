"use strict";
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define(
    "Step",
    {
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      instructionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stepImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "Steps",
      timestamps: false,
    }
  );
  Step.associate = function (models) {
    // associations can be defined here
    Step.belongsTo(models.Instruction, {
      as: "instruction",
    });
    Step.belongsTo(models.FileData, {
      as: "stepImage",
      foreignKey: "stepImageId",
    });
  };
  return Step;
};
