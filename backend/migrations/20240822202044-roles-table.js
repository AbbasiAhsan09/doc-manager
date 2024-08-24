'use strict';

const  EnumUserTypes = [
  'admin',
  'doctor',
  'clinic',
  'pharmacy',
  'pharma'
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('roles', {
      id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
      },
      name : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      type : {
        type : Sequelize.ENUM(...EnumUserTypes),
        allowNull : false,
      },
      key : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true,
      },
      createdAt : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW
      },
      updatedAt : {
        type : Sequelize.DATE,
        allowNull : false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('roles');
     */

    await queryInterface.dropTable('roles');

  }
};
