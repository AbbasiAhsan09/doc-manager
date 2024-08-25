import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { EUserTypes } from "src/shared/@enum/user-type.enum";

@Table({
    tableName  :'roles',
    timestamps  : true
})
export class Role extends Model<Role> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type : DataType.INTEGER,
    })
    id : number;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    name : string

    @Column({
        type : DataType.STRING,
        allowNull : false,
        unique  : true
    })
    key : string;

    @Column({
        type : DataType.ENUM(EUserTypes.ADMIN, EUserTypes.CLINIC, EUserTypes.PHARMA, EUserTypes.DOCTOR, EUserTypes.PHARMACY),
        allowNull : false,
    })
    type : EUserTypes;

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
}