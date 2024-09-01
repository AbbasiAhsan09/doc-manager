import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.entity";
import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";

@Table({
    tableName : 'clinic_users',
    timestamps : true,
    paranoid : true
})

export class ClinicUser extends Model<ClinicUser>{

    @Column({
        type : DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id : number;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    userId : number;

    @ForeignKey(() => Clinic)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    clinicId : number;

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


    // Relations

    @BelongsTo(() => Clinic)
    clinic : Clinic;


    @BelongsTo(() => User)
    user : User;


}