import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { RoleService } from "../roles-module/services/role.service";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import { Role } from "../roles-module/entities/role.entity";
import * as bcrypt from 'bcrypt'
import { Op } from "sequelize";
import { ClinicUser } from "../entities/clinic-user.entity";
import { Clinic } from "@src/resources/clinic-module/entities/clinic.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(User.name) private readonly userModel : typeof User,
        private readonly roleSErvice : RoleService,
        @Inject(ClinicUser.name) private readonly clinicUserModel  : typeof ClinicUser
    ){}

    async create(body : CreateUserDto){
        try {

            const { roleId, userType, password, email, username } = body;
            const role = await this.roleSErvice.findOne(+roleId);

            // Check if role found or not
            if(!role || (role instanceof GeneralResponseDto && role.status)) return role;
            
            // Check role type and usertype is same
            if(role instanceof Role && role?.type !== userType) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Invalid role type for the user.`));

            // Check if user already exist
            const checkExistingUser = await this.findOneByUsernameOrEmail({email,username});
            if(checkExistingUser) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`User with this email or username already exist.`));


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            return await this.userModel.create({...body, password : hashedPassword})
            
        } catch (err) {
            throw new Error(err);
        }
    }

    async findOneByUsernameOrEmail({email , username} : {email ?: string, username? : string}){
        try {
            
            const check = await this.userModel.findOne({
                where : {
                [Op.or] : {
                    email,
                    username
                },
            },
            include : [
                {
                    model : ClinicUser,
                    include : [Clinic]
                }
            ]
        })

            if(!check) return false;

            return check;

        } catch (err) {
            throw new Error(err)
        }
    }

    async hardDelete(id : number){
        try {

            const user = await this.userModel.findOne({where : { id : +id}});

            if(!user) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`User not found for id : ${+id}`));

            return await user.destroy({force : true});
            
        } catch (err) {
            throw new Error(err);
        }
    }

    async createUserClinicAssociation(userId : number, clinicId : number) {
        try {

            const check = await this.clinicUserModel.findOne({where :  {userId, clinicId}});

            if(check) return check;

            return await this.clinicUserModel.create({userId, clinicId});
        } catch (err) {
            throw new Error(err);
        }
    }
}