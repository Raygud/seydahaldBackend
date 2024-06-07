'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User model
      Group.belongsTo(models.User, { foreignKey: 'userId' });
      // Define association with Sheep model
      Group.hasMany(models.Sheep, { foreignKey: 'groupId' });
    }
  }
  Group.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', // Note: table name should be pluralized 'Users' not 'User'
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
