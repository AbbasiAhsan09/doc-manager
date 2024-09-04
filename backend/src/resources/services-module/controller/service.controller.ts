import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ServiceService } from "../services/service.service";
import { CreateServiceDto } from "../dto/create-service.dto";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Service Module")
@ApiBearerAuth()
@Controller('services')
export class ServiceController{
    constructor(private readonly serviceService : ServiceService){}


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Post('/clinic/')
    async create(@Body() body : CreateServiceDto, @Req() req){
        return await this.serviceService.create({...body, clinicId : req.user?.clinicUser.clinicId, createdBy : req.user.id})
    }

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Put('/clinic/:id')
    async update(@Param("id") id : number, @Body() body : CreateServiceDto, @Req() req){
        return await this.serviceService.update(+id,{...body, clinicId : req.user?.clinicUser.clinicId});
    }


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get('/clinic/')
    async findAllByClinic( @Req() req){
        return await this.serviceService.findAllByClinic(req.user?.clinicUser.clinicId);
    }

    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get('/clinic/group/:groupId')
    async findAllByGroup(@Param("groupId") groupId : number, @Req() req){
        return await this.serviceService.findAllByGroup(groupId, req.user?.clinicUser.clinicId);
    }


    @UserTypes(EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Delete('/clinic/:id')
    async destroy(@Param("id") id : number, @Req() req){
        return await this.serviceService.destroy(+id,req.user?.clinicUser.clinicId);
    }
}