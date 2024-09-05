import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DoctorType } from "../entities/doctor-type.entity";
import { CreateDoctorTypeDto } from "../dto/create-doctor-type.dto";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { UpdateDoctorTypeDto } from "../dto/update-doctor-type.dto";
import { Op } from "sequelize";

@Injectable()
export class DoctorTypeService {
    constructor(
        @Inject(DoctorType.name) private readonly doctorTypeModle : typeof DoctorType
    ){}

    async create(body  : CreateDoctorTypeDto ){
        try {
            
            const {title} = body;

            const check  = await this.doctorTypeModle.findOne({where : { title }});

            if(check) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Doctor type with title ${title} already exist.`));


            return await this.doctorTypeModle.create({...body});

        } catch (err) {
            throw new Error(err);
        }
    }


    async update(id: number, body : UpdateDoctorTypeDto){
        try {
            
            const {title} = body;

            if(!title) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Title is required.`));

            const check = await this.doctorTypeModle.findOne({
                where : {
                    [Op.not] : {
                        id,
                    },
                    title,
                }
            });


            if(check) return  new GeneralResponseDto(HttpStatus.CONFLICT, String(`Doctor type with title ${title} already exist.`));

            const doctorType = await this.doctorTypeModle.findByPk(id);

            return await doctorType.update({...body});

        } catch (err) {
            throw new Error(err);
        }
    }

    async findAll(){
        try {
            
            return await this.doctorTypeModle.findAll();

        } catch (err) {
            throw new Error(err);
        }
    }


    async findOne(id : number){
        try {

            return await this.doctorTypeModle.findOne({where : {id} });
        } catch (err) {
            throw new Error(err);
        }
    }
}