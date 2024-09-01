import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateServiceGroupDto, CreateServiceGroupFullDto } from "../dto/create-service-group.dto";
import { ServiceGroup } from "../entities/service-group.entity";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";

@Injectable()
export class ServiceGroupService {
    constructor(
        @Inject(ServiceGroup.name) private readonly serviceGroupModel : typeof ServiceGroup
    ){}

    async create(body : CreateServiceGroupFullDto){
        try {
            
            const {code, clinicId} = body;

            const checkCode = await this.serviceGroupModel.findOne({where : {code, clinicId}});

            if(checkCode) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Ooops! Code: ${code} already associated with another service group.`));


            return await this.serviceGroupModel.create(body);
        } catch (err) {
            throw new Error(err);
        }
    }


    async findAll(condition : any){
        try {
            return await this.serviceGroupModel.findAll({where : {...condition}});
        } catch (err) {
            throw new Error(err);
        }
    }
}