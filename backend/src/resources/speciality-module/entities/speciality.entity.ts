import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName : 'specialities',
    timestamps : true,
    paranoid : true
})
export class Sepciality extends Model<Sepciality>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @Column({
        allowNull : false,
        unique  : true,
        type : DataType.STRING
    })
    title : string;


    @Column({
        allowNull : true,
        type : DataType.STRING
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