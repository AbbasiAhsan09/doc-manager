import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DoctorService } from "../services/doctor.service";
import { AcceptInviteNewDoctor } from "../dto/accept-new-doctor-invite.dto";

@ApiTags("Doctor API Module")
@Controller("doctor")
export class DoctorController{
    constructor(
        private readonly doctorService : DoctorService
    ){}

    @Post("/accept-invite/new")
    async acceptInviteNewDoctor(@Body() body : AcceptInviteNewDoctor){
        return await this.doctorService.acceptInviteNewDoctor(body)
    }
}