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

    await queryInterface.createTable('clinic_users', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      userId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'users',
          key : 'id'
        }
      },
      clinicId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references :{
          model : 'clinics',
          key : 'id'
        }
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

    await queryInterface.dropTable('clinic_users');
  }
};
