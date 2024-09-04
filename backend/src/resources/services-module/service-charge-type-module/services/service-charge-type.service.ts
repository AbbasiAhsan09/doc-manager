import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateServiceChargeTypeDto } from "../dto/create-service-charge-type.dto";
import { ServiceChargeType } from "../entities/service-charge-type.entity";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { UpdateServiceChargeTypeDto } from "../dto/update-service-charge-type.dto";
import { Op } from "sequelize";

@Injectable()
export class ServiceChargeTypeService {

    constructor(
        @Inject(ServiceChargeType.name) private readonly serviceChargeTypeModel  : typeof ServiceChargeType
    ){

    }

    async create(body : CreateServiceChargeTypeDto){
        try {
            const  { key } = body;
            const check = await this.serviceChargeTypeModel.findOne({
                where : { key }
            });

            if(check) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Service charge type already exist with key : ${key} please use unique key.`));

            return (await this.serviceChargeTypeModel.create(body)).save();

        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id : number, body: UpdateServiceChargeTypeDto) {
        try {
            const { key } = body;

            if(!key) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Key is required.`));

            const check = await this.serviceChargeTypeModel.findOne({
                where : {
                    key,
                    [Op.not] : {
                        id
                    }
                }
            });

            if(check) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Service charge type already exist with key : ${key} please use unique key.`));


            return (await check.update(body)).save();

        } catch (err) {
            throw new Error(err);
        }
    }

    async findAll(){
        try {
            return await this.serviceChargeTypeModel.findAll();
        } catch (err) {
            throw new Error(err);
        }
    }

    async findOne(id : number){
        try {
            const check = await this.serviceChargeTypeModel.findByPk(+id);

            if(!check) return new GeneralResponseDto(HttpStatus.NOT_FOUND,String(`Service Charge Type not found with ID : ${id}`));

            return check;

        } catch (err) {
            throw new Error(err);
        }
    }


    async destroy(id : number){
        try {
            const type = await this.serviceChargeTypeModel.findByPk(id);

            if(!type) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Invalid ID : ${id}! Please use valid ID to delete charge type`))

            await type.destroy();

            return new GeneralResponseDto(HttpStatus.OK, String(`Service charge type deleted successfuly.`));


        } catch (err) {
            throw new Error(err);
        }
    }
}