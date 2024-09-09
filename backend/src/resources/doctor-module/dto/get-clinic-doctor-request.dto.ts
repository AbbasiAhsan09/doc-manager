import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PaginationDto } from "@src/shared/dto/pagination.dto";
import { IsOptional, IsString } from "class-validator";

export class GetClinicDoctorRequestDto extends PartialType(PaginationDto){
    @ApiProperty({required : false})
    @IsString()
    @IsOptional()
    search ? : string
}