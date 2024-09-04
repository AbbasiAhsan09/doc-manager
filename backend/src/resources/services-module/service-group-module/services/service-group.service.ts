import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateServiceGroupDto, CreateServiceGroupFullDto } from "../dto/create-service-group.dto";
import { ServiceGroup } from "../entities/service-group.entity";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { UpdateServiceGroupFullDto } from "../dto/update-service-group";

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

    async findOneForClinic(id : number, clinicId : number){
        try {
            return await this.serviceGroupModel.findOne({where : {clinicId, id}});
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id : number, body : UpdateServiceGroupFullDto){
        try {
            
            const {clinicId} = body
            
            if(!clinicId) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`You are not authorized to do this action.`));

            const group = await this.serviceGroupModel.findOne({where : {id, clinicId}});

            if(!group) new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Service group not found.`));
            
            await group.update({...body});

            return  new GeneralResponseDto(HttpStatus.OK, String(`Service group updated successfuly.`));            

        } catch (err) {
            throw new Error(err);
        }
    }


    async destroy(id : number, clinicId : number){
        try {   
            const group = await this.serviceGroupModel.findOne({where : {id, clinicId}});

            if(!group) new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Service group not found.`));
            
            await group.destroy();

            return  new GeneralResponseDto(HttpStatus.OK, String(`Service group deleted successfuly.`));  

        } catch (err) {
            throw new Error(err);
        }
    }
}