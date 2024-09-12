import { ApiProperty } from "@nestjs/swagger";
import { EGender } from "@src/shared/@enum/gender.enum";
import { EMaritalStatus } from "@src/shared/@enum/marital-status.enum";
import { EPatientSource } from "@src/shared/@enum/patient-source.enum";
import { ERelationships } from "@src/shared/@enum/realtionships.enum";
import { IsOptional, IsString, IsEmail, IsEnum, IsNumber } from "class-validator";


export class CreatePatientDto {
    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    mrNumber? : string;
   
    @ApiProperty({required : true})
    @IsString()
    firstName : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    middleName? : string;

    @ApiProperty({required : true})
    @IsString()
    lastName : string;


    @ApiProperty({required : false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email? : string;


    @ApiProperty({required : true, enum : EGender})
    @IsEnum(EGender)
    gender : EGender;


    @ApiProperty({required : true, enum : EMaritalStatus})
    @IsEnum(EMaritalStatus)
    maritalStatus : EMaritalStatus;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    address? : string;


    @ApiProperty({required : true})
    @IsString()
    guardianName : string;


    @ApiProperty({required : true, enum : ERelationships})
    @IsEnum(ERelationships)
    guardianRelation : ERelationships;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    contact? : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    emergencyContact? : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    emergencyContactPersonName? : string;


    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    dob? : string;


    @ApiProperty({required : false, enum : ERelationships})
    @IsEnum(ERelationships)
    @IsOptional()
    emergencyContactPersonRelation? : ERelationships;
    

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    patientIdNumber? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    socialSecurityNumber? : string;

    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    refBy? : string;


    @ApiProperty({required : true, enum : EPatientSource})
    @IsEnum(EPatientSource)
    source : EPatientSource;

    @ApiProperty({required : true})
    @IsNumber()
    doctorId : number;

}

export class CreatePatientFullDto extends CreatePatientDto{
    


    @ApiProperty({required : true})
    @IsNumber()
    clinicId : number;
}