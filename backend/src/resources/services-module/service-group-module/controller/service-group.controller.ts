import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ServiceGroupService } from "../services/service-group.service";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateServiceGroupDto } from "../dto/create-service-group.dto";
import { UpdateServiceGroupFullDto } from "../dto/update-service-group";

@ApiTags("Service Group Module")
@ApiBearerAuth()
@Controller("service-groups")
export class ServiceGroupController {
    constructor(private readonly serviceGroupService : ServiceGroupService){}

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Post("/clinic")
    async createByClinic(@Body() body : CreateServiceGroupDto, @Req() req ){
 
        return await this.serviceGroupService.create({...body, clinicId : req.user?.clinicUser.clinicId});
    }


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get("/clinic")
    async getByClinic(@Req() req ){
 
        return await this.serviceGroupService.findAll({clinicId : req.user?.clinicUser.clinicId});
    }

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get("/clinic/:id")
    async findOneClinic(@Param("id") id : number, @Req() req){
 
        return await this.serviceGroupService.findOneForClinic(+id, req.user.clinicUser.clinicId);
    }


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Delete("/clinic/:id")
    async destroy(@Param("id") id : number, @Req() req){
 
        return await this.serviceGroupService.destroy(+id, req.user.clinicUser.clinicId);
    }


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Put("/clinic/:id")
    async updateByClinic(@Param("id") id : number, @Body() body : UpdateServiceGroupFullDto, @Req() req ){
 
        return await this.serviceGroupService.update(+id, {...body, clinicId : req.user?.clinicUser.clinicId});
    }
}