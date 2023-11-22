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
      Post.hasMany(models.Comment, {
        foreignKey: { name: 'postId' },
      });
      Post.belongsToMany(models.User, {
        as: 'vote',
        foreignKey: 'postId',
        through: models.Vote,
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
      mainImage: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      voteCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
