import { ApiProperty } from "@nestjs/swagger";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { IsEnum, IsString } from "class-validator";

export class JwtPayload  {
    @ApiProperty({readOnly : true})
    @IsString()
    sub: string;

    @ApiProperty({readOnly : true})
    @IsString()
    username: string;

    @ApiProperty({readOnly : true})
    @IsString()
    email: string;


    @ApiProperty({readOnly : true, enum : EUserTypes})
    @IsString()
    @IsEnum(EUserTypes)
    userType: EUserTypes;
  };