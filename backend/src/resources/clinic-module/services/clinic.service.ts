import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Clinic } from "../entities/clinic.entity";
import { UserService } from "src/resources/user-module/services/user.service";
import { CreateClinicDto } from "../dto/create-clinic.dto";
import { SignupClinicDto } from "../dto/signup-clinic.dto";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import { User } from "src/resources/user-module/entities/user.entity";

@Injectable()
export class ClinicService {
    constructor(
        @Inject(Clinic.name) private readonly clinicModel  : typeof Clinic,
        private readonly userService : UserService
    ){}


    async create(body : CreateClinicDto){
        try {
            
            return await this.clinicModel.create({...body});
        } catch (err) {
            throw new Error(err);
        }
    }

    async clinicSignUp(body : SignupClinicDto){
        try {
            const {clinicName : name, ...userDto} = body;
            

            const user = await this.userService.create({...userDto});

            if(!user || (user instanceof GeneralResponseDto && user.status)) return user;

            // creat clinic 
            if(user instanceof User){

                const clinic = await this.create({name, ownerId : user.id});

                if(!clinic){
                    await this.userService.hardDelete(user.id);
                    return new GeneralResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, String(`Oops! Something went wrong while creating your account please try again later or contact support.`))
                }

                // Associate Clinic
                await this.userService.createUserClinicAssociation(user.id, clinic.id);

                return new GeneralResponseDto(HttpStatus.CREATED, String(`Account has been created successfuly.`));
            }

        } catch (err) {
            throw new Error(err);
        }
    }
}