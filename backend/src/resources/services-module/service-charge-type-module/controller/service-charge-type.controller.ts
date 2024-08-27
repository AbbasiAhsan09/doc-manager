import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ServiceChargeTypeService } from "../services/service-charge-type.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateServiceChargeTypeDto } from "../dto/create-service-charge-type.dto";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";


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

}