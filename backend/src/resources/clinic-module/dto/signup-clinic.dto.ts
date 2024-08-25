import { CreateUserDto } from 'src/resources/user-module/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class SignupClinicDto extends CreateUserDto{
    @ApiProperty({required  : true})
    @IsString()
    clinicName : string
}