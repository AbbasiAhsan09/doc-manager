import { PartialType } from "@nestjs/swagger";
import { CreateDoctorTypeDto } from "./create-doctor-type.dto";

export class UpdateDoctorTypeDto extends PartialType(CreateDoctorTypeDto) {
    
}