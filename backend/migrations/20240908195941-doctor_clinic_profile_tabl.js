'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('doctor_clinic_profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      doctorId : {
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
        references : {
          model : 'clinics',
          key  :'id'
        }
      },
      doctorType : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'doctor_types',
          key : 'id'
        }
      },
      onlineAppointment : {
        type : Sequelize.BOOLEAN,
        allowNull : true
      },
      onlineAppointmentFee: {
        type : Sequelize.INTEGER,
        allowNull : true,
      },
      timings : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      specialization: {
        type : Sequelize.STRING,
        allowNull : true
      },
      preOnlineAppointmentFeeCharged :{
        type : Sequelize.BOOLEAN,
        allowNull : true
      },
      appointmentNotificationEmail : {
        type : Sequelize.STRING,
        allowNull : true
      },
      appointmentNotificationPhone : {
        type : Sequelize.STRING,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('doctor_clinic_profiles');

  }
};
