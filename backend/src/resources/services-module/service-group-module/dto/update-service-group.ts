import { PartialType } from "@nestjs/swagger";
import { CreateServiceGroupFullDto } from "./create-service-group.dto";

export class UpdateServiceGroupFullDto extends PartialType(CreateServiceGroupFullDto){
    
}