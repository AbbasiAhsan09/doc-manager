import { PartialType } from "@nestjs/swagger";
import { CreateServiceFullDto } from "./create-service.dto";

export class UpdateServiceDto extends PartialType(CreateServiceFullDto) {

}