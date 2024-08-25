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

    await queryInterface.createTable('clinics', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name : {
        type : Sequelize.STRING,
        allowNull  :false,
      },
      email :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      phone :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      logo :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      cover :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      bio :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      tagline :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      address :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      zipcode :  {
        type  :Sequelize.STRING,
        allowNull : true,
      },
      ownerId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model  :'users',
          key  :'id',
        },
        onDelete : 'CASCADE'
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
    await queryInterface.dropTable('clinics');
  }
};
