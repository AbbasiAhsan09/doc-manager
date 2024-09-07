import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "@src/resources/user-module/dto/create-user.dto";
import { IsNumber, IsString } from "class-validator";

export class AcceptInviteNewDoctor extends CreateUserDto {
    @ApiProperty({
        required : true
    })
    @IsString()
    token : string;
    
    @ApiProperty({
        required : true
    })
    @IsNumber()
    clinicId : number;
    
}