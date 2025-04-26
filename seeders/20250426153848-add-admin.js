'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('admin123', 10);

    const [users] = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE email = 'admin@admin'`
    );

    if (users.length === 0) {
      await queryInterface.bulkInsert('users', [
        {
          name: 'admin',
          email: 'admin@admin',
          password: password,
          cpf: '123.456.789-98',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
