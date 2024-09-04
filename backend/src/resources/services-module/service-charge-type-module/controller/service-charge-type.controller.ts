import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ServiceChargeTypeService } from "../services/service-charge-type.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateServiceChargeTypeDto } from "../dto/create-service-charge-type.dto";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UpdateServiceChargeTypeDto } from "../dto/update-service-charge-type.dto";


@ApiTags("Service Charge Type Management API")
@ApiBearerAuth()
@Controller("service-charge-types")
export class ServiceChargeTypeController{
    constructor(private readonly serviceChargeTypeService : ServiceChargeTypeService ){}
    
    @UserTypes(EUserTypes.ADMIN)
    @UseGuards(ProtectedRouteGuard)
    @Post("/")
    async create(@Body() body : CreateServiceChargeTypeDto) {
        return await this.serviceChargeTypeService.create(body);
    }

    @UserTypes(EUserTypes.ADMIN)
    @UseGuards(ProtectedRouteGuard)
    @Put("/:id")
    async update(@Param("id") id : number, @Body() body : UpdateServiceChargeTypeDto) {
        return await this.serviceChargeTypeService.update(+id, body);
    }

    @UserTypes(EUserTypes.ADMIN, EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get("/")
    async findAll() {
        return await this.serviceChargeTypeService.findAll();
    }

    @UserTypes(EUserTypes.ADMIN, EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get("/:id")
    async findOne(@Param("id") id : number) {
        return await this.serviceChargeTypeService.findOne(+id);
    }


    @UserTypes(EUserTypes.ADMIN)
    @UseGuards(ProtectedRouteGuard)
    @Delete("/:id")
    async destroy(@Param("id") id : number) {
        return await this.serviceChargeTypeService.destroy(+id);
    }

}