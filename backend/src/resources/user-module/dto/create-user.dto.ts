import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { EUserTypes } from "src/shared/@enum/user-type.enum";

export class CreateUserDto {
    @ApiProperty({required : true})
    @IsString()
    firstName : string

    @ApiProperty({required : true})
    @IsString()
    lastName : string
    
    @ApiProperty({required : true})
    @IsString()
    @IsEmail()
    email : string
    
    @ApiProperty({required : true})
    @IsString()
    username : string
    
    @ApiProperty({required : true})
    @IsString()
    @IsStrongPassword({minLength : 6, minUppercase : 1, minSymbols : 1, minNumbers : 1})
    password : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    nickName? : string

    @ApiProperty({required : true})
    @IsString()
    @IsEnum(EUserTypes)
    userType : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    image? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    contact? : string;

    @ApiProperty({required : true})
    @IsNumber()
    @IsOptional()
    roleId?: number;
    
}