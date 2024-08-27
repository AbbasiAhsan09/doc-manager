import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { ServiceGroup } from "../service-group-module/entities/service-group.entity";
import { ServiceChargeType } from "../service-charge-type-module/entities/service-charge-type.entity";

@Table({
    tableName : 'services',
    timestamps : true,
    paranoid : true
})
export class Service extends Model<Service> {
    
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

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    rate : number;

    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })
    allowedDiscountPercentage : number;

    @Column({
        type : DataType.INTEGER,
        allowNull : true
    })
    appliedTaxPercentage : number;

    @ForeignKey(()=> ServiceGroup)
    @Column({
        type  :DataType.INTEGER,
        allowNull : false
    })
    groupId : number;


    @ForeignKey(()=> ServiceChargeType)
    @Column({
        type  :DataType.INTEGER,
        allowNull : true
    })
    chargeType : number;


    @ForeignKey(()=> ServiceGroup)
    @Column({
        type  :DataType.INTEGER,
        allowNull : false
    })
    clinicId : number;

    @ForeignKey(()=> ServiceGroup)
    @Column({
        type  :DataType.INTEGER,
        allowNull : true
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
}