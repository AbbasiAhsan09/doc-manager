import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, IsOptional } from "class-validator";


export class InviteDoctorDto {
    @ApiProperty({required : true})
    @IsString()
    @IsEmail()
    email : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    message ? : string
}