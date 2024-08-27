'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('services', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      allowedDiscountPercentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      appliedTaxPercentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      groupId: {
        type: Sequelize.INTEGER, // Ensure this matches the type of `id` in `service_groups`
        allowNull: false,
        references: {
          model: 'service_groups',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      chargeType: {
        type: Sequelize.INTEGER, // Ensure this matches the type of `id` in `service_charge_types`
        allowNull: false,
        references: {
          model: 'service_charge_types',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clinics',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'SET NULL' // Use SET NULL to handle existing data
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
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};
