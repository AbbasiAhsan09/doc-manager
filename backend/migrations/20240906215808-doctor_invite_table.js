'use strict';

const EnumCommonStatus = [
  'pending',
  'approved',
  'blocked',
  'rejected'
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
    await queryInterface.createTable('doctor_invites', { 
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },
      email : {
        type : Sequelize.STRING,
        allowNull : false
      },
      clinicId : {
        type : Sequelize.INTEGER,
        allowNull :false,
        references : {
          model : 'clinics',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      firstInvite : {
        type : Sequelize.BOOLEAN,
        allowNull : true
      },
      token : {
        type : Sequelize.STRING,
        allowNull : false
      },
      status : {
        type : Sequelize.ENUM(EnumCommonStatus),
        allowNull : true,
        defaultValue : EnumCommonStatus[0]
      },
      acceptedAt : {
        type : Sequelize.DATE,
        allowNull : true,
      }
     });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('doctor_invites');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
