import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GeneralResponseDto {

    @ApiProperty({required : true, readOnly : true})
    @IsEnum(HttpStatus)
    status : HttpStatus;

    @ApiProperty({required : false, readOnly : true})
    @IsString()
    @IsOptional()
    message ? : string

    constructor(status:HttpStatus, message? : string){
        this.status = status
        this.message = message
    }

}