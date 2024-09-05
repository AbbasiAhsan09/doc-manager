import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateSpecialityDto {
    
    
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


}