import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DoctorService } from "../services/doctor.service";
import { AcceptInviteNewDoctor } from "../dto/accept-new-doctor-invite.dto";
import { AcceptExistingDoctorInvite } from "../dto/accept-existing-doctor-invite.dto";
import { CreateDoctorDefaultProfileControllerDto } from "../dto/create-doctor-default-profile.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";

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

    @Post("/accept-invite/")
    async acceptInviteExistingDoctor(@Body() body : AcceptExistingDoctorInvite){
        return await this.doctorService.acceptExistingDoctorInvite(body)
    }

    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.DOCTOR)
    @Post("/default-profile")
    async createOrUpdateDefaultProfile(@Body() body : CreateDoctorDefaultProfileControllerDto, @Req() req){
        return await this.doctorService.createOrUpdateDoctorDefaultProfile({...body, doctorId : req.user.id});
    }
}