import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AppointmentService } from "../services/appointment.service";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";

@ApiBearerAuth()
@ApiTags("Appointment Module")
@Controller('appointment')
export class AppointmentController{
    constructor(
        private readonly appointmentService : AppointmentService
    ){}

    @UseGuards(ProtectedRouteGuard)
    @UserTypes(EUserTypes.CLINIC)
    @Post("/")
    async createAppointment(@Body() body : CreateAppointmentDto, @Req() req){
       
        return await this.appointmentService.createAppointment({...body, clinicId : req.user.clinicUser.clinicId, createdById : req.user.id});
    }



}