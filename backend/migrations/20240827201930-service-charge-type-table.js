'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('service_charge_types', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      title : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      key : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      description : {
        type : Sequelize.TEXT,
        allowNull : true,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('service_charge_types');

  }
};
