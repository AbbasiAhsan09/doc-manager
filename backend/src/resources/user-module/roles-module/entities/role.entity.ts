import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

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