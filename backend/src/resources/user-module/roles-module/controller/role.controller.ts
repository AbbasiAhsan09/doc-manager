import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dot";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { GetRoleRequestDto } from "../dto/get-roles.dto";

@ApiTags("Role Management API")
@Controller("/roles")
export class RoleController {
    constructor(
        private readonly roleService : RoleService
    ){}

    @Get("/")
    async findAll(@Query() params : GetRoleRequestDto){
        return await this.roleService.findAll(params);
    }

    @Get("/:id")
    async findOne(@Param("id") id : number){
        return await this.roleService.findOne(id);
    }

    @ApiConsumes('multipart/form-data','application/json')
    @Post("/")
    async create(@Body() body  : CreateRoleDto){
        return await this.roleService.create(body);
    }

    @Put("/:id")
    async update(@Param("id") id  : number, @Body() body  : UpdateRoleDto){
        return await this.roleService.update(+id, body);
    }

}