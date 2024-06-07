// models/user.js
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
        this.setDataValue('password', hash);
      }
    },
    profilePicture: {
      type: DataTypes.STRING,  // Assuming the picture is stored as a URL or file path
      allowNull: true
    },
    recoveryEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: true
    }
    // ... any other fields you want to include
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Group, { foreignKey: 'userId' });
  };

  // Optionally, you could define instance methods to compare passwords
  User.prototype.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };

  return User;
};
