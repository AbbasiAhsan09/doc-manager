import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName : 'service_charge_types',
    paranoid : true,
    timestamps : true
})

export class ServiceChargeType extends Model<ServiceChargeType> {

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
        unique : true
    })
    key : string;


    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    description : string;


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