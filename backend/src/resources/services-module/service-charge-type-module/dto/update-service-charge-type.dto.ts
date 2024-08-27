import { PartialType } from "@nestjs/swagger";
import { CreateServiceChargeTypeDto } from "./create-service-charge-type.dto";

export class UpdateServiceChargeTypeDto extends PartialType(CreateServiceChargeTypeDto) {
    
}