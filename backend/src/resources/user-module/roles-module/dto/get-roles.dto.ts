import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { EUserTypes } from "src/shared/@enum/user-type.enum";
import { PaginationDto } from "src/shared/dto/pagination.dto";

export class GetRoleRequestDto extends PartialType(PaginationDto){
    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    name ?  : string

    @ApiProperty({required : false, enum : EUserTypes})
    @IsEnum(EUserTypes)
    @IsOptional()
    type ?  : EUserTypes

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    generalSearch ?  : string

}