import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsStrongPassword } from "class-validator";
import { User } from "src/resources/user-module/entities/user.entity";

export class LoginRequestDto {
    @ApiProperty({required : true})
    @IsString()
    emailOrUsername : string

    @ApiProperty({required : true})
    @IsString()
    @IsStrongPassword()
    password : string;
}

export class LoginResponseDto {
    @ApiProperty({required : true})
    @IsNumber()
    id : number

    @ApiProperty({required : true})
    @IsString()
    token : string;

    @ApiProperty({required : true})
    @IsString()
    email : string;

    @ApiProperty({required : true})
    @IsString()
    expiresIn : string;

    constructor(token : string, user:User){
        this.id  = user.id,
        this.token = token,
        this.email = user.email
        this.expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '1h'
    }
}