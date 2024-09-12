import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PatientService } from "../services/patient.service";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";

@ApiBearerAuth()
@ApiTags('Patient Module APIs')
@Controller("patient")
export class PatientController{
    constructor(
        private readonly patientService : PatientService
    ){}
    

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Post("/")
    @ApiBody({ type: CreatePatientDto })
    @ApiOperation({ summary: 'Create a new patient record' })
    async create(@Body() body : CreatePatientDto, @Req() req){
        return await this.patientService.create({...body, clinicId : req.user.clinicUser.clinicId});
    }

}