'use strict';

const maritalStatusOptions = [
  "single",
  "married",
  "divorced",
  "widowed",
  "separated",
  "domestic partnership",
  "civil union",
  "engaged",
  "cohabiting",
  "annulled",
  "minor"
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

    await queryInterface.createTable('patients',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        mrNumber: {
          type : Sequelize.STRING,
          unique : true,
          allowNull : true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        middleName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.ENUM("male","female","other"),
          allowNull: false,
        },
        maritalStatus : {
          type  :Sequelize.ENUM(maritalStatusOptions),
          allowNull : false,
          defaultValue : maritalStatusOptions[0]
        },
        address : {
          type : Sequelize.STRING,
          allowNull : true
        },
        guardianName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contact: {
          type: Sequelize.STRING,
          allowNull: true
        },
        emergencyContact: {
          type: Sequelize.STRING,
          allowNull: true
        },
        emergencyContactPersonName : {
          type  : Sequelize.STRING,
          allowNull : true
        },
        dob : {
          type:Sequelize.DATEONLY,
          allowNull : false,
          defaultValue : '1900-01-01'
        },
        emergencyContactPersonRelation : {
          type : Sequelize.STRING,
          allowNull : true
        },
        patientIdNumber : {
          type: Sequelize.STRING,
          allowNull: true
        },
        socialSecurityNumber : {
          type :Sequelize.STRING,
          allowNull : true
        },
        refBy : {
          type : Sequelize.STRING,
          allowNull : true
        },
        doctorId : {
          type  :Sequelize.INTEGER,
          allowNull : false,
          references  : {
            model : 'users',
            key : 'id'
          }
        },
        clinicId : {
          type  :Sequelize.INTEGER,
          allowNull : false,
          references  : {
            model : 'clinics',
            key : 'id'
          } 
        },
        firstEntryFrom : {
          type  :Sequelize.ENUM("opd","epd","other"),
          allowNull : false,
          defaultValue : 'opd'
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
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('patients');
     */
    await queryInterface.dropTable('patients');
  }
};
