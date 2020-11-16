'use strict';
module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'Equipments',
    timestamps: false
  });
  Equipment.associate = function(models) {
    // associations can be defined here
    Equipment.belongsToMany(models.Instruction, {
      through: 'EquipmentInstruction',
      as: 'instructions'
    }); 

    Equipment.belongsTo(models.FileData, {
      as: 'image',
      foreignKey: 'imageId'
    });

    Equipment.belongsTo(models.Status, {
      as: 'status',
      foreignKey: 'statusId'
    });

  };
  return Equipment;
};