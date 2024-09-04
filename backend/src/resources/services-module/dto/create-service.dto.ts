import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {

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

    @ApiProperty({required : true})
    @IsNumber()
    rate : number;

    @ApiProperty({required : false})
    @IsNumber()
    @IsOptional()
    allowedDiscountPercentage? : number;

    @ApiProperty({required : false})
    @IsNumber()
    @IsOptional()
    appliedTaxPercentage? : number;

    @ApiProperty({required : true})
    @IsNumber()
    groupId : number;

    @ApiProperty({required : false})
    @IsNumber()
    @IsOptional()
    chargeType? : number;

}

export class CreateServiceFullDto extends CreateServiceDto {

    @ApiProperty({required : true})
    @IsNumber()
    clinicId : number;


    @ApiProperty({required : true})
    @IsNumber()
    @IsOptional()
    createdBy ?: number;

}