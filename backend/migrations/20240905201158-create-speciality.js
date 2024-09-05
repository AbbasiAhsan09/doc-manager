'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('specialities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull : false,
        unique : true,
        type: Sequelize.STRING
      },
      description: {
        allowNull : true,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt : {
        type : Sequelize.DATE,
        allowNull : true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('specialities');
  }
};