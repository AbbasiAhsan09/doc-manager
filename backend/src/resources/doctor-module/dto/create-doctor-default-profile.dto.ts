import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDoctorDefaultProfileControllerDto {

    @ApiProperty({required : true})
    @IsNumber()
    doctorType: number

    @ApiProperty({required : false})
    @IsBoolean()
    @IsOptional()
    onlineAppointment : boolean


    @ApiProperty({required : false})
    @IsNumber()
    @IsOptional()
    onlineAppointmentFee : number


    @ApiProperty({required : false})
    @IsBoolean()
    @IsOptional()
    eCheckup : boolean

    @ApiProperty({required : false})
    @IsNumber()
    @IsOptional()
    eCheckupFee : number


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    specialization : string


    @ApiProperty({required : false})
    @IsBoolean()
    @IsOptional()
    preOnlineAppointmentFeeCharged : boolean


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    appointmentNotificationEmail : string

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    appointmentNotificationPhone : string

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    offDays : string
}


export class CreateDoctorDefaultProfileServiceDto extends CreateDoctorDefaultProfileControllerDto {
    
    @ApiProperty({required : true})
    @IsNumber()
    doctorId : number;
}