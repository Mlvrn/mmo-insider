'use strict';

const { hashPassword } = require('../utils/bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'user1',
          email: 'user1@example.com',
          password: hashPassword('password123'),
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'admin',
          email: 'admin@example.com',
          password: hashPassword('adminpassword'),
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
