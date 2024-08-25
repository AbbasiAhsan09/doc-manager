import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateClinicDto {
    @ApiProperty({required : true})
    @IsString()
    name : string;

    @ApiProperty({required : false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email? : string;

    @ApiProperty({required : false})
    @IsString()
    // @IsPhoneNumber()
    @IsOptional()
    phone? : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    address? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    logo? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    cover? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    bio? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    tagLine? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    zipcode? : string;

    @ApiProperty({required : false})
    @IsNumber()
    ownerId : number;


}