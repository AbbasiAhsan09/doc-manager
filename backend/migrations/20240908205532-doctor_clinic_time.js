'use strict';

const weekDays = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('doctor_clinic_timings', {
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      profileId : {
        type  :Sequelize.INTEGER,
        allowNull : false,
        references :{
          model: 'doctor_clinic_profiles',
          key : 'id'
        }
      },
      day : {
        type : Sequelize.ENUM(weekDays),
        allowNull : false,
      },
      from : {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      to : {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      anytime : {
        type : Sequelize.BOOLEAN,
        allowNull : true
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
    
    await queryInterface.dropTable('doctor_clinic_timings');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
