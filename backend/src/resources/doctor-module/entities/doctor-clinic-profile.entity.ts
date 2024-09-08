import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";
import { DoctorType } from "@src/resources/doctor-type-module/entities/doctor-type.entity";
import { User } from "@src/resources/user-module/entities/user.entity";
import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName : 'doctor_clinic_profiles',
    paranoid: true,
    timestamps: true
})
export class DoctorClinicProfile extends Model<DoctorClinicProfile>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type :  DataType.INTEGER,
    })
    id : number;

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

    @ForeignKey(() => DoctorType)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    doctorType : number;


    @Column({
        type : DataType.BOOLEAN,
        allowNull : true
    })
    onlineAppointment : boolean;

    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })
    onlineAppointmentFee : number;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    specialization : string;

    @Column({
        type : DataType.BOOLEAN,
        allowNull : true
    })
    preOnlineAppointmentFeeCharged : boolean;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    appointmentNotificationEmail : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    appointmentNotificationPhone : string;


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