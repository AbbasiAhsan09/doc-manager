import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateDoctorTypeDto {
    
    
    @ApiProperty({
        required : true
    })
    @IsString()
    title : string;


    @ApiProperty({
        required : false
    })
    @IsString()
    @IsOptional()
    description? : string;


    // @ApiProperty({
    //     required : false
    // })
    // @IsString()
    // @IsOptional()
    // icon? : string;


}