'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        as: 'author',
        foreignKey: {
          name: 'authorId',
        },
      });
      Post.belongsToMany(models.User, {
        as: 'likedUsers',
        foreignKey: 'postId',
        through: models.LikedPost,
      });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
