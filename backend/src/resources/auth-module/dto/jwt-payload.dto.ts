import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class JwtPayload  {
    @ApiProperty({readOnly : true})
    @IsString()
    sub: string;

    @ApiProperty({readOnly : true})
    @IsString()
    username: string;
  };