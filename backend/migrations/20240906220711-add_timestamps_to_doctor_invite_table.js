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

    await queryInterface.addColumn('doctor_invites',
      'createdAt',
      {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW
      }
    );

    await queryInterface.addColumn('doctor_invites',
      'updatedAt',
      {
        type : Sequelize.DATE,
        allowNull : true,
      }
    );

    await queryInterface.addColumn('doctor_invites',
      'deletedAt',
      {
        type : Sequelize.DATE,
        allowNull : true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('doctor_invites',
      'createdAt'
    );

    await queryInterface.removeColumn('doctor_invites',
      'updatedAt'
    );

    await queryInterface.removeColumn('doctor_invites',
      'deletedAt'
    );

  }
};
