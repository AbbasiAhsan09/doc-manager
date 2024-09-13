'use strict';

const paymentStatus = ['pending','paid','refunded','failed'];
const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "PayPal",
  "Bank Transfer",
  "Cash",
  "Other"
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
    await queryInterface.createTable('doctor_appointment_payments', {
      id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
      },
      appointmentId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model: 'doctor_appointments',
          key : 'id'
        }
      },
      status : {
        type : Sequelize.ENUM(paymentStatus),
        allowNull : false,
        defaultValue : paymentStatus[0]
      },
      paymentMethod : {
        type : Sequelize.ENUM(paymentMethods),
        allowNull : false,
        defaultValue : paymentMethods[4]
      },
      paymentDescription : {
        type : Sequelize.STRING,
        allowNull : true
      },
      paymentAt : {
        type  : Sequelize.DATE,
        allowNull : true
      },
      grossAmount : {
        type  :Sequelize.INTEGER,
        allowNull : false,
      },
      discountAmount : {
        type : Sequelize.INTEGER,
        allowNull : true,
      },
      discountDescription : {
        type : Sequelize.STRING,
        allowNull : true
      },
      taxAmount : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      otherCharges  : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      otherChargesDescription : {
        type : Sequelize.STRING,
        allowNull : true
      },
      note : {
        type : Sequelize.STRING,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('doctor_appointment_payments');
     */
    
    await queryInterface.dropTable('doctor_appointment_payments');
  }
};
