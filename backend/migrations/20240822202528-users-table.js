'use strict';

const  EnumUserTypes = [
  'admin',
  'doctor',
  'clinic',
  'pharmacy',
  'pharma'
]

const EnumCommonStatus = [
  'pending',
  'approved',
  'blocked',
  'rejected'
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      nickName: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      userType: {
        type: Sequelize.ENUM([...EnumUserTypes]),
        allowNull: false,
      },
      status : {
        type: Sequelize.ENUM([...EnumCommonStatus]),
        allowNull : true
      },
      verifiedAt : {
        type : Sequelize.DATE,
        allowNull : true
      },
      image : {
        type : Sequelize.STRING,
        allowNull : true,
      },
      roleId :  {
        type : Sequelize.INTEGER,
        allowNull : true,
        references : {
          model  :'roles',
          key : 'id',
          
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  }
};
