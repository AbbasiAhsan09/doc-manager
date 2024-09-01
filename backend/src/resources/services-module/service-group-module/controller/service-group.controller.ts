import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ServiceGroupService } from "../services/service-group.service";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateServiceGroupDto } from "../dto/create-service-group.dto";

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
}