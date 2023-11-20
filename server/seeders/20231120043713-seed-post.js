'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios.get('https://www.mmobomb.com/api1/latestnews');
    const postData = response.data;

    const userIds = [1, 2, 3, 4];

    const getRandomUserId = () => {
      const randomIndex = Math.floor(Math.random() * userIds.length);
      return userIds[randomIndex];
    };

    await queryInterface.bulkInsert(
      'Posts',
      postData.map((post) => ({
        title: post.title,
        shortDescription: post.short_description,
        thumbnail: post.thumbnail,
        mainImage: post.main_image,
        content: post.article_content,
        authorId: getRandomUserId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
