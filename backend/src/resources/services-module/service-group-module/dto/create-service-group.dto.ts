import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceGroupDto {
    @ApiProperty({required : true})
    @IsString()
    title : string;

    @ApiProperty({required : true})
    @IsString()
    code : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    description? : string;

}


export class CreateServiceGroupFullDto extends CreateServiceGroupDto{
    
    @ApiProperty({required : true})
    @IsNumber()
    clinicId : number;
}