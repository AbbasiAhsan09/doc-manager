import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateServiceChargeTypeDto {
    @ApiProperty({required : true})
    @IsString()
    title : string;


    @ApiProperty({required : true})
    @IsString()
    key : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    description : string;
} 