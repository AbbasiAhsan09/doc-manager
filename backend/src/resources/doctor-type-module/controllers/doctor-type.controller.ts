import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { DoctorTypeService } from "../services/doctor-type.service";
import { CreateDoctorTypeDto } from "../dto/create-doctor-type.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateDoctorTypeDto } from "../dto/update-doctor-type.dto";

@ApiTags("Doctor Type Module")
@Controller("doctor-type")
export class DoctorTypeController {
    constructor(private readonly doctorTypeService  : DoctorTypeService){}

    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Post("/")
    async create(@Body() body : CreateDoctorTypeDto){
        return await this.doctorTypeService.create(body);
    }


    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Put("/:id")
    async update(@Param("id") id  :number, @Body() body : UpdateDoctorTypeDto){
        return await this.doctorTypeService.update(+id,body);
    }


    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Get("/")
    async findAll(){
        return await this.doctorTypeService.findAll();
    }

    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Get("/:id")
    async findOne(@Param("id") id  :number){
        return await this.doctorTypeService.findOne(+id);
    }
}