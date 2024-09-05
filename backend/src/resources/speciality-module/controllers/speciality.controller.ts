import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SpecialityService } from "../services/speciality.service";
import { CreateSpecialityDto } from "../dto/create-speciality.dto";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";
import { UserTypes } from "@src/resources/auth-module/decorators/user-type.decorator";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Speciality Module")
@Controller("speciality")
export class SpecialityController {
    constructor(private readonly specialityService  : SpecialityService){}

    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Post("/")
    async create(@Body() body : CreateSpecialityDto){
        return await this.specialityService.create(body);
    }


    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Put("/:id")
    async update(@Param("id") id  :number, @Body() body : CreateSpecialityDto){
        return await this.specialityService.update(+id,body);
    }


    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Get("/")
    async findAll(){
        return await this.specialityService.findAll();
    }

    @UserTypes(EUserTypes.ADMIN)
    @ApiBearerAuth()
    @UseGuards(ProtectedRouteGuard)
    @Get("/:id")
    async findOne(@Param("id") id  :number){
        return await this.specialityService.findOne(+id);
    }
}