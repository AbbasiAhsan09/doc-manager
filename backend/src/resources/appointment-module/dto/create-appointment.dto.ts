import { ApiProperty } from "@nestjs/swagger";
import { EAppointmentSource } from "@src/shared/@enum/appointment-source.enum";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class createAppointmentDto {
    @ApiProperty({required : true})
    @IsNumber()
    patientId : number;

    @ApiProperty({required : true})
    @IsNumber()
    doctorId : number;

    @ApiProperty({required : true})
    @IsNumber()
    clinicId : number;

    @ApiProperty({required : true})
    @IsString()
    appointmentNumber : string;

    @ApiProperty({required : true})
    @IsDate()
    appointmentDate : Date;

    @ApiProperty({required : true, enum : EAppointmentSource})
    source : EAppointmentSource;

    @ApiProperty({required : false})
    eCheckup ? : boolean;

    @ApiProperty({required : false})
    confirmed ? : boolean;

    @ApiProperty({required : false})
    @IsOptional()
    cancelledById ? : number;
    
    @ApiProperty({required : false})
    @IsDate()
    @IsOptional()
    cancelledAt ? : Date;

}