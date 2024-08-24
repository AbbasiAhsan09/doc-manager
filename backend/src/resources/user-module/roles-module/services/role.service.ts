import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Role } from "../entities/role.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import { generateRandomString } from "src/shared/utils/string.util";
import { UpdateRoleDto } from "../dto/update-role.dot";
import { GetRoleRequestDto } from "../dto/get-roles.dto";
import { PaginationService } from "src/shared/services/pagination.service";
import { Op } from "sequelize";
import { PaginationMetaDto, PaginationResponseDto } from "src/shared/dto/pagination.dto";

@Injectable()

export class RoleService {
    constructor(
        @Inject(Role.name) private readonly roleModel : typeof Role,
        private readonly paginationService :  PaginationService
    ){}

    async findAll(params : GetRoleRequestDto){
        try {
            const {limit,offset,page} = this.paginationService.getPaginationParams(params.page, params.limit);

            const where : any = {};

            if(params.name){
                where.name = {
                    [Op.like] : `%${params.name}%`
                }
            }

            if(params.type){
                where.type = params.type
            }

            const {rows, count} = await this.roleModel.findAndCountAll({
                where,
                offset,
                limit
            });

            const meta = new PaginationMetaDto(page, limit, count);
            return new PaginationResponseDto(rows, meta);

        } catch (err) {
            throw new Error(err);
        }
    }

    async findOne(id : number){
        try {
            const role = await this.roleModel.findByPk(+id);
            
            if(!role) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Role with id : ${id} does not exist.`));

            return role;
        } catch (err) {
            throw new Error(err);
        }
    }

    async create(body : CreateRoleDto){
        try {
            let key: string;
            let checkDuplicate: any;
    
            do {
                key = generateRandomString(8);
                checkDuplicate = await this.roleModel.findOne({
                    where: { key },
                });
            } while (checkDuplicate);

            return await this.roleModel.create({...body, key});

        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id : number, body : UpdateRoleDto){
        try {
            
            const role = await this.roleModel.findByPk(id);

            if(!role) return new GeneralResponseDto(HttpStatus.NOT_FOUND,String("Role id is invalid please try with different id."))

            return (await role.update({...body})).save();

        } catch (err) {
            throw new Error(err);
        }
    }

}