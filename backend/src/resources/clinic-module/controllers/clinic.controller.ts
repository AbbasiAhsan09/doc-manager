import { Controller } from "@nestjs/common";
import { ClinicService } from "../services/clinic.service";

@Controller('/clinic')
export class ClinicController {
    constructor(
        private readonly clinicService : ClinicService
    ){}
}