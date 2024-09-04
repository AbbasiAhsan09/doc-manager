import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Service } from "../entities/service.entity";
import { CreateServiceDto, CreateServiceFullDto } from "../dto/create-service.dto";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { UpdateServiceDto } from "../dto/update-service.dto";
import { Op } from "sequelize";

@Injectable()
export class ServiceService {
    constructor(
        @Inject(Service.name) private readonly serviceModel : typeof Service
    ){}

    async create(body : CreateServiceFullDto){
        try {

            const {code, clinicId} = body;

            const codeCheck = await this.serviceModel.findOne({where : {clinicId,code}});

            if(codeCheck) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Ooops! Code: ${code} already associated with another service.`));

            return await this.serviceModel.create(body);
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id : number, body : UpdateServiceDto){
        try {
            
            const {clinicId, code} = body;

            if(!clinicId || !code) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Clinic ID and Code is required.`));

            const service = await this.serviceModel.findOne({where : { clinicId , id}});

            if(!service) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Service not found for ID : ${id}`));

            const codeCheck = await this.serviceModel.findOne({where : {
                [Op.not] : {
                    id
                },
                clinicId,
                code
            }});

            if(codeCheck) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Ooops! Code: ${code} already associated with another service.`));

            await service.update({...body});

            return  new GeneralResponseDto(HttpStatus.OK, String(`Service updated successfuly.`)); 

        } catch (err) {
            throw new Error(err);
        }
    }


    async findByPK(id : number){
        try {
            return await this.serviceModel.findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
    }

    async findAllByClinic(clinicId : number){
        try {
            return await this.serviceModel.findAll({where : {clinicId}});
        } catch (err) {
            throw new Error(err);
        }
    }

    async findAllByGroup(groupId : number, clinicId : number){
        try {
            return await this.serviceModel.findAll({where : {clinicId,groupId}});
        } catch (err) {
            throw new Error(err);
        }
    }

    async destroy(id : number, clinicId : number){
        try {
            
            const check = await this.serviceModel.findOne({where : {clinicId, id}});

            if(!check) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Service not found for ID : ${id}`));

            await check.destroy();

            return  new GeneralResponseDto(HttpStatus.OK, String(`Service deleted successfuly.`)); 
        } catch (err) {
            throw new Error(err);
        }
    }
}