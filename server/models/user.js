'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../utils/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        as: 'author',
        foreignKey: { name: 'authorId' },
      });
      User.hasMany(models.Comment, {
        foreignKey: { name: 'userId' },
      });
      User.belongsToMany(models.Post, {
        as: 'likedPost',
        foreignKey: 'userId',
        through: models.LikedPost,
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
        beforeUpdate: (user) => {
          if (user.changed) {
            user.password = hashPassword(user.password);
          }
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
