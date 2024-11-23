import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";
import { Patient } from "@src/resources/patient-module/entities/patient.entity";
import { User } from "@src/resources/user-module/entities/user.entity";
import { EAppointmentSource } from "@src/shared/@enum/appointment-source.enum";
import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName : 'doctor_appointments',
    timestamps : true,
    paranoid : true
})
export class DoctorAppointment extends Model<DoctorAppointment>{
    
    @Column({
        type : DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id : number;

    @ForeignKey(() => Patient)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    patientId : number;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    doctorId : number;


    @ForeignKey(() => Clinic)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    clinicId : number;

    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })
    appointmentNumber : number;


    @Column({
        type : DataType.DATEONLY,
        allowNull : true
    })
    appointmentDate : Date;


    @Column({
        type : DataType.ENUM(
            EAppointmentSource.Clinic,
            EAppointmentSource.Online,
            EAppointmentSource.Other
        ),
        allowNull : false,
        defaultValue : EAppointmentSource.Clinic
    })
    source : EAppointmentSource;

    @Column({
        type : DataType.BOOLEAN,
        allowNull : true
    })
    eCheckup : boolean

    @Column({
        type : DataType.BOOLEAN,
        allowNull : true
    })
    confirmed : boolean

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    createdById : number;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })
    cancelledById : number;

    @Column({
        type : DataType.DATE,
        allowNull : true
    })
    cancelledAt : Date

    
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



    @BelongsTo(() => Clinic)
    clinic : Clinic

}