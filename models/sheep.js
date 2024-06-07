// models/sheep.js
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Sheep = sequelize.define('Sheep', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    picture: {
      type: DataTypes.STRING, // Assuming the picture is stored as a URL or file path
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    motherId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sheep',
        key: 'id',
      }
    },
    fatherId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sheep',
        key: 'id',
      }
    },
  });

  Sheep.associate = function (models) {
    Sheep.belongsTo(models.Group, { foreignKey: 'groupId' });
    Sheep.hasMany(models.Vaccination, { foreignKey: 'sheepId' });
    Sheep.hasMany(models.Medicine, { foreignKey: 'sheepId' });
    Sheep.belongsTo(models.Sheep, { as: 'Mother', foreignKey: 'motherId' });
    Sheep.belongsTo(models.Sheep, { as: 'Father', foreignKey: 'fatherId' });
  };

  return Sheep;
};
