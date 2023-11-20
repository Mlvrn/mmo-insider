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
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user2',
          email: 'user2@example.com',
          password: hashPassword('password123'),
          role: 2,
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user3',
          email: 'user3@example.com',
          password: hashPassword('password123'),
          role: 2,
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user4',
          email: 'user4@example.com',
          password: hashPassword('password123'),
          role: 2,
          isEmailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'admin',
          email: 'admin@example.com',
          password: hashPassword('adminpassword'),
          role: 1,
          isEmailVerified: true,
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
