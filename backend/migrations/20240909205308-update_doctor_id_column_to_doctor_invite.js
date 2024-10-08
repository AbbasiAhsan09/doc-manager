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

    await queryInterface.removeColumn("doctor_invites",'doctor_id');

    await queryInterface.addColumn("doctor_invites",'doctorId',{
      type : Sequelize.INTEGER,
      allowNull : true,
      references : {
        model : 'users',
        key : 'id'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("doctor_invites",'doctorId');
  }
};
