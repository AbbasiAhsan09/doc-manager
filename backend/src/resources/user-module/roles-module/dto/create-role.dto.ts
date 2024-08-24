import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { EUserTypes } from "src/shared/@enum/user-type.enum";

export class CreateRoleDto {
    @ApiProperty({required : true})
    @IsString()
    name : string;

    @ApiProperty({required : true, enum : EUserTypes})
    @IsString()
    @IsEnum(EUserTypes)
    type : EUserTypes;

}