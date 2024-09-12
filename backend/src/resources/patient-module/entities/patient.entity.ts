import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";
import { User } from "@src/resources/user-module/entities/user.entity";
import { EGender } from "@src/shared/@enum/gender.enum";
import { EMaritalStatus } from "@src/shared/@enum/marital-status.enum";
import { EPatientSource } from "@src/shared/@enum/patient-source.enum";
import { ERelationships } from "@src/shared/@enum/realtionships.enum";
import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName  :'patients',
    paranoid : true,
    timestamps : true
})
export class Patient extends Model<Patient>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    mrNumber : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    firstName : string

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    middleName : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    lastName : string


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    email : string


    @Column({
        type : DataType.ENUM(EGender.Male, EGender.Female, EGender.Other),
        allowNull : false
    })
    gender : EGender

    @Column({
        type : DataType.ENUM(
            EMaritalStatus.Annulled,
            EMaritalStatus.CivilUnion,
            EMaritalStatus.Cohabiting,
            EMaritalStatus.Divorced,
            EMaritalStatus.DomesticPartnership,
            EMaritalStatus.Engaged,
            EMaritalStatus.Married,
            EMaritalStatus.Minor,
            EMaritalStatus.Separated,
            EMaritalStatus.Single,
            EMaritalStatus.Widowed
        ),
        allowNull : false,
        defaultValue : EMaritalStatus.Single
    })
    maritalStatus : EMaritalStatus;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    address : string

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    guardianName : string

    @Column({
        type : DataType.ENUM(
            ERelationships.Aunt,
            ERelationships.Brother,
            ERelationships.Cousin,
            ERelationships.Daughter,
            ERelationships.Father,
            ERelationships.Granddaughter,
            ERelationships.Grandfather,
            ERelationships.Grandmother,
            ERelationships.Grandson,
            ERelationships.Husband,
            ERelationships.Mother,
            ERelationships.Nephew,
            ERelationships.Niece,
            ERelationships.Other,
            ERelationships.Sister,
            ERelationships.Son,
            ERelationships.Uncle,
            ERelationships.Wife,
        ),
        allowNull : false
    })
    guardianRelation : ERelationships;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    contact : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    emergencyContact : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    emergencyContactPersonName : string;


    @Column({
        type : DataType.STRING,
        allowNull : false,
        defaultValue : '1900-01-01'
    })
    dob : string;

    @Column({
        type : DataType.ENUM(
            ERelationships.Aunt,
            ERelationships.Brother,
            ERelationships.Cousin,
            ERelationships.Daughter,
            ERelationships.Father,
            ERelationships.Granddaughter,
            ERelationships.Grandfather,
            ERelationships.Grandmother,
            ERelationships.Grandson,
            ERelationships.Husband,
            ERelationships.Mother,
            ERelationships.Nephew,
            ERelationships.Niece,
            ERelationships.Other,
            ERelationships.Sister,
            ERelationships.Son,
            ERelationships.Uncle,
            ERelationships.Wife,
        ),
        allowNull : true
    })
    emergencyContactPersonRelation : ERelationships;


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    patientIdNumber : string;


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    socialSecurityNumber : string;


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    refBy : string;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    doctorId : number;


    @ForeignKey(() => Clinic)
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
    })
    clinicId : number;

    @Column({
        type : DataType.ENUM(
            EPatientSource.Epd,
            EPatientSource.Opd,
            EPatientSource.Other
        ),
        allowNull : false
    })
    source : EPatientSource;

    @CreatedAt
    @Column({
        type : DataType.DATE,
        defaultValue : DataType.NOW,
        allowNull : false
    })
    createdAt: Date; 

    @UpdatedAt
    @Column({
        type : DataType.DATE,
        allowNull : true
    })
    updatedAt: Date; 


    @DeletedAt
    @Column({
        type : DataType.DATE,
        allowNull : true
    })
    deletedAt: Date; 

}