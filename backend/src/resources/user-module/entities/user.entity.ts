import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { ECommonStatus } from "src/shared/@enum/common-status.enum";
import { EUserTypes } from "src/shared/@enum/user-type.enum";
import { Role } from "../roles-module/entities/role.entity";

@Table({
    tableName  :'user',
    timestamps : true,
})
export class User extends Model<User> {
    
    @Column({
        type : DataType.INTEGER,
        primaryKey : true,
        autoIncrement : true
    })
    id : number;

    @Column({
        type : DataType.STRING,
        allowNull : false        
    })
    firstName : string;

    @Column({
        type : DataType.STRING,
        allowNull : false        
    })
    lastName : string;

    @Column({
        type : DataType.STRING,
        allowNull : false        
    })
    email : string;

    @Column({
        type : DataType.STRING,
        allowNull : false ,
        unique : true      
    })
    username : string;

    @Column({
        type : DataType.STRING,
        allowNull : true ,
        unique : false      
    })
    nickName : string;

    @Column({
        type : DataType.ENUM(EUserTypes.ADMIN,EUserTypes.CLINIC,EUserTypes.DOCTOR,EUserTypes.PHARMA,EUserTypes.PHARMACY),
        allowNull : false,     
    })
    userType : string;

    @Column({
        type : DataType.ENUM(ECommonStatus.APPROVED, ECommonStatus.REJECTED, ECommonStatus.PENDING, ECommonStatus.BLOCKED),
        allowNull : true        
    })
    status : string;

    @Column({
        type : DataType.DATE,
        allowNull : true     
    })
    verifiedAt : Date;

    @Column({
        type : DataType.STRING,
        allowNull : true     
    })
    image : string;

    @ForeignKey(() => Role)
    @Column({
        type : DataType.INTEGER,
        allowNull : true     
    })
    roleId : number;

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

    @BelongsTo(() => Role)
    role : Role
}