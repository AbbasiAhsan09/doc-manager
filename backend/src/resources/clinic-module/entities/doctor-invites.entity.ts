import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Clinic } from "./clinic.entity";
import { ECommonStatus } from "@src/shared/@enum/common-status.enum";

@Table({
    tableName : 'doctor_invites',
    paranoid : true,
    timestamps :true
})

export class DoctorInvite extends Model<DoctorInvite>{
    
    @PrimaryKey
    @AutoIncrement
    @Column({
        type :  DataType.INTEGER,
    })
    id : number;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    email : string

    @ForeignKey(() => Clinic)
    @Column({
        type : DataType.NUMBER,
        allowNull : false
    })
    clinicId : number;

    @Column({
        type : DataType.BOOLEAN,
        allowNull : true
    })
    firstInvite : boolean;


    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    token : string

    @Column({
        type : DataType.ENUM(ECommonStatus.APPROVED, ECommonStatus.PENDING, ECommonStatus.REJECTED, ECommonStatus.BLOCKED),
        allowNull : true,
        defaultValue : ECommonStatus.PENDING
    })
    status : ECommonStatus

    @Column({
        allowNull : true,
        type : DataType.DATE,
    })
    acceptedAt : Date

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