import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "src/resources/user-module/entities/user.entity";

@Table({
    tableName : 'clinics',
    timestamps : true
})

export class Clinic extends Model<Clinic> {
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
    name : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    email : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    phone : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    address : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    logo : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    cover : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    bio : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    tagline : string;

    @Column({
        type : DataType.STRING,
        allowNull : true
    })
    zipcode : string;

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    ownerId : number;

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

    // Relations
    @BelongsTo(() => User)
    owner : User
}