import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Sepciality } from "../entities/speciality.entity";
import { CreateSpecialityDto } from "../dto/create-speciality.dto";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { UpdateSpecialityDto } from "../dto/update-sepciality.dto";
import { Op } from "sequelize";

@Injectable()
export class SpecialityService {
    constructor(
        @Inject(Sepciality.name) private readonly specialityModle : typeof Sepciality
    ){}

    async create(body  : CreateSpecialityDto ){
        try {
            
            const {title} = body;

            const check  = await this.specialityModle.findOne({where : { title }});

            if(check) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Speciality with title ${title} already exist.`));


            return await this.specialityModle.create({...body});

        } catch (err) {
            throw new Error(err);
        }
    }


    async update(id: number, body : UpdateSpecialityDto){
        try {
            
            const {title} = body;

            if(!title) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Title is required.`));

            const check = await this.specialityModle.findOne({
                where : {
                    [Op.not] : {
                        id,
                    },
                    title,
                }
            });


            if(check) return  new GeneralResponseDto(HttpStatus.CONFLICT, String(`Speciality with title ${title} already exist.`));

            const speciality = await this.specialityModle.findByPk(id);

            return await speciality.update({...body});

        } catch (err) {
            throw new Error(err);
        }
    }

    async findAll(){
        try {
            
            return await this.specialityModle.findAll();

        } catch (err) {
            throw new Error(err);
        }
    }


    async findOne(id : number){
        try {

            return await this.specialityModle.findOne({where : {id} });
        } catch (err) {
            throw new Error(err);
        }
    }
}