import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ClinicService } from "../services/clinic.service";
import { SignupClinicDto } from "../dto/signup-clinic.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InviteDoctorDto } from "../dto/invite-doctor.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";

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

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @ApiBearerAuth()
    @Post('/invite/doctor')
    async inviteDoctor(@Body() body : InviteDoctorDto, @Req() req){
        return await this.clinicService.inviteDoctor(req.user?.clinicUser.clinicId, body);
    }
}