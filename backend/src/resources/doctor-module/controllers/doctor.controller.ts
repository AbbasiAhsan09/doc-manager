import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DoctorService } from "../services/doctor.service";
import { AcceptInviteNewDoctor } from "../dto/accept-new-doctor-invite.dto";
import { AcceptExistingDoctorInvite } from "../dto/accept-existing-doctor-invite.dto";
import { CreateDoctorDefaultProfileControllerDto } from "../dto/create-doctor-default-profile.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { CreateDoctorClinicProfileControllerDto } from "../dto/create-doctor-clinic-profile.dto";
import { GetClinicDoctorRequestDto } from "../dto/get-clinic-doctor-request.dto";

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


    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.DOCTOR)
    @Post("/:clinicId/profile/")
    async createOrUpdateClinicProfile(@Param("clinicId") clinicId : number,@Body() body : CreateDoctorClinicProfileControllerDto, @Req() req){
        return await this.doctorService.createOrUpdateDoctorClinicProfile({...body, doctorId : req.user.id, clinicId});
    }

    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.DOCTOR)
    @Get("/default-profile/")
    async getDefaultProfile(@Req() req){
        return await this.doctorService.getDefaultProfile(req.user.id);
    }


    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.DOCTOR)
    @Get("/clinic/profiles/")
    async getClinicProfiles(@Req() req){
        return await this.doctorService.getClinicProfiles(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.CLINIC)
    @Get("/clinic/")
    async getClinicDoctor(@Req() req,@Query() params : GetClinicDoctorRequestDto){
        return await this.doctorService.getClinicDoctors(req.user.clinicUser.clinicId, params);
    }


    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.DOCTOR)
    @Get("/:clinicId/profile/")
    async getClinicProfile(@Param("clinicId") clinicId : number, @Req() req){
        return await this.doctorService.getClinicProfile(req.user.id, clinicId);
    }
}