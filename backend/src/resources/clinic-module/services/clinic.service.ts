import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Clinic } from "../entities/clinic.entity";
import { UserService } from "src/resources/user-module/services/user.service";
import { CreateClinicDto } from "../dto/create-clinic.dto";
import { SignupClinicDto } from "../dto/signup-clinic.dto";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import { User } from "src/resources/user-module/entities/user.entity";
import { InviteDoctorDto } from "../dto/invite-doctor.dto";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { DoctorInvite } from "../entities/doctor-invites.entity";
import { generateRandomString } from "@src/shared/utils/string.util";
import * as bcrypt from 'bcrypt';
import { MailService } from "@src/shared/modules/mail/mail.service";

@Injectable()
export class ClinicService {
    constructor(
        @Inject(Clinic.name) private readonly clinicModel  : typeof Clinic,
        private readonly userService : UserService,
        @Inject(DoctorInvite.name) private readonly doctorInviteModel : typeof DoctorInvite,
        private readonly mailService : MailService
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

    async inviteDoctor(clinicId : number, body : InviteDoctorDto){
        try {
            const {email, message} = body;

            const check = await this.doctorInviteModel.findOne({
                where : {
                    email,
                    clinicId
                }
            });

            if(check) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`${check.acceptedAt ? `Doctor with email : ${email} already exist.` : `Invitaiton already sent to email : ${email}`}`));

            const doctor = await this.userService.findOneByUsernameOrEmail({email,username : email});
            const clinic = await this.clinicModel.findByPk(clinicId);
            const token = generateRandomString(12);
            const hashedToken = await bcrypt.hash(token,10);
            let inviteBody : any = {clinicId : clinic.id,email,token:hashedToken} 

            if(doctor && doctor.userType === EUserTypes.DOCTOR){
                
                
            }else{
                inviteBody.firstInvite = true;
            }

            const mail = await this.mailService.sendMail({
                subject : `You are invited by ${clinic.name}`,
                to : [{email}],
                text : `${message},
                Token : ${token}, Clinic ID : ${clinic.id}
                `
            })

            if(mail){

                const invite = await this.doctorInviteModel.create(inviteBody);
                return new GeneralResponseDto(HttpStatus.OK, String(`Invitation sent to email : ${invite.email}`));
            }else{
                return new GeneralResponseDto(HttpStatus.BAD_GATEWAY, String(`Oops! Something went wrong while sending the invitation.`));
            }



        } catch (err) {
            throw new Error(err);
        }
    }

    async findOne(id : number){
        try {
            return await this.clinicModel.findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
    }


    async findClinicUser(clinicId : number, userId : number){
        return await this.userService.findClinicUser(clinicId,userId);
    }

 
}