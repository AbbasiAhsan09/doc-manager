import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";
import { User } from "@src/resources/user-module/entities/user.entity";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName : 'service_groups',
    timestamps : true,
    paranoid : true
})

export class ServiceGroup extends Model<ServiceGroup> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    title : string;


    @Column({
        type : DataType.STRING,
        allowNull : false,
    })
    code : string;


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    description : string;

    @ForeignKey(() => Clinic)
    @Column({
        type : DataType.INTEGER,
        allowNull :false,
    })
    clinicId : number;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull :true,
    })
    createdBy : number;


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
    createdByUser : User

}