import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDoctorClinicProfileControllerDto {

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
}


export class CreateDoctorClinicProfileServiceDto extends CreateDoctorClinicProfileControllerDto {
    
    @ApiProperty({required : true})
    @IsNumber()
    doctorId : number;

    @ApiProperty({required : true})
    @IsNumber()
    clinicId : number;
}