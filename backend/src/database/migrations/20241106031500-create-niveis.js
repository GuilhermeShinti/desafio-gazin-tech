'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('niveis', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nivel: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, _) {
    await queryInterface.dropTable('niveis');
  }
};
