import { Body, Controller, Post } from "@nestjs/common";
import { ClinicService } from "../services/clinic.service";
import { SignupClinicDto } from "../dto/signup-clinic.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Clinic Management API")
@Controller('/clinic')
export class ClinicController {
    constructor(
        private readonly clinicService : ClinicService
    ){}


    @Post("/signup")
    async signup(@Body() body : SignupClinicDto){
        return await this.clinicService.clinicSignUp(body);
    }
}