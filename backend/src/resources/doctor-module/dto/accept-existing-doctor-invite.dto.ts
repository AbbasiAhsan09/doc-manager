import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AcceptExistingDoctorInvite {
    @ApiProperty({required : true})
    @IsString()
    token : string;

    @ApiProperty({required : true})
    @IsNumber()
    inviteId : number;
}