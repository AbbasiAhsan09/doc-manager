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

    await queryInterface.createTable('doctor_appointments', { 
      id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true 
      },
      patientId : {
        type  :Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'patients',
          key : 'id'
        }
      },
      doctorId : {
        type  :Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'users',
          key : 'id'
        }
      },
      appointmentNumber : {
        type : Sequelize.INTEGER,
        allowNull : true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('doctor_appointments');
     */

    await queryInterface.dropTable('doctor_appointments');
  }
};
