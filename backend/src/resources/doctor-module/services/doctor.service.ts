import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserService } from "@src/resources/user-module/services/user.service";
import { AcceptInviteNewDoctor } from "../dto/accept-new-doctor-invite.dto";
import { DoctorInvite } from "@src/resources/clinic-module/entities/doctor-invites.entity";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import * as bcrypt from 'bcrypt';
import { ECommonStatus } from "@src/shared/@enum/common-status.enum";
import { ClinicService } from "@src/resources/clinic-module/services/clinic.service";
import { MailService } from "@src/shared/modules/mail/mail.service";
import { User } from "@src/resources/user-module/entities/user.entity";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { AcceptExistingDoctorInvite } from "../dto/accept-existing-doctor-invite.dto";
import { DoctorDefaultProfile } from "../entities/doctor-default-profile.entity";
import { CreateDoctorDefaultProfileServiceDto } from "../dto/create-doctor-default-profile.dto";
import { DoctorTypeService } from "@src/resources/doctor-type-module/services/doctor-type.service";
import { DoctorClinicProfile } from "../entities/doctor-clinic-profile.entity";
import { CreateDoctorClinicProfileServiceDto } from "../dto/create-doctor-clinic-profile.dto";
import { Op } from "sequelize";
import { DoctorType } from "@src/resources/doctor-type-module/entities/doctor-type.entity";
import { GetClinicDoctorRequestDto } from "../dto/get-clinic-doctor-request.dto";
import { PaginationService } from "@src/shared/services/pagination.service";
import { PaginationMetaDto, PaginationResponseDto } from "@src/shared/dto/pagination.dto";

@Injectable()
export class DoctorService {
    constructor(
        private readonly userService : UserService,
        private readonly clinicService : ClinicService,
        private readonly mailService : MailService,
        private readonly doctorTypeService : DoctorTypeService,
        private readonly paginationService :  PaginationService,
        @Inject(DoctorInvite.name) private readonly doctorInviteModel : typeof DoctorInvite,
        @Inject(DoctorDefaultProfile.name) private readonly doctorDefaultProfileModel : typeof DoctorDefaultProfile,
        @Inject(DoctorClinicProfile.name) private readonly doctorClinicProfileModel : typeof DoctorClinicProfile

        

    ){}

    async acceptInviteNewDoctor(body : AcceptInviteNewDoctor){
        try {
            
            const {token, email,clinicId ,...userData} = body;
         
            const check = await this.doctorInviteModel.findOne({
                where : {email, clinicId, acceptedAt : null, status : ECommonStatus.PENDING}
            });

          

            if(!check) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`This invitation has been expired.`));

            const compare = await bcrypt.compare(token, check.token);

            if(!compare) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`Invitation token is not valid.`));

            const user = await this.userService.create({...userData, email});
            

            if((user instanceof GeneralResponseDto && user.status === HttpStatus.CONFLICT) || (user instanceof User && user.id)){
                const existedUser = await this.userService.findOneByUsernameOrEmail({email,username :email});
                if(existedUser && existedUser.userType !== EUserTypes.DOCTOR) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`User already existed with type : ${existedUser.userType} please contact support.`));
                if(existedUser){
                    await this.doctorInviteModel.update(
                        {
                            acceptedAt : new Date(),
                            status : ECommonStatus.APPROVED,
                            doctorId : existedUser.id
                        },
                        {
                            where : {
                                email,
                                clinicId
                            }
                        } 
                        );
                    await this.userService.createUserClinicAssociation(existedUser.id,clinicId);
                    await this.sendInvitationAcceptedEmailToClinic(clinicId, existedUser);
                    await this.cloneProfileToClinicProfile(existedUser.id,clinicId)
                }

                return new GeneralResponseDto(HttpStatus.OK, String(`Invitation has been accepted`));
            }

            return new GeneralResponseDto(HttpStatus.BAD_GATEWAY, String(`Oops! Something went wrong please contact support.`));

        } catch (err) {
            throw new Error(err);
        }
    }


    async sendInvitationAcceptedEmailToClinic(clinicId : number, doctor : User){
        try {
            
            const clinic = await this.clinicService.findOne(clinicId);

            if(!clinic) return;

            if(!clinic.email) return;

            return await this.mailService.sendMail({
                subject : `Invitation accepted by ${doctor.email}`,
                to : [{name : clinic.name, email : clinic.email}],
                text : `Invitation accepted by doctor ${doctor.firstName} ${doctor.lastName}`
            });
        } catch (err) {
            throw new Error(err);
        }
    }


    async acceptExistingDoctorInvite(body : AcceptExistingDoctorInvite){
        try {
            const {inviteId, token} = body;

            const invite = await this.doctorInviteModel.findOne({
                where : {
                    id : +inviteId,
                    acceptedAt : null
                }
            });

            if(!invite) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`This invitation has been expired.`));

            const compare = await bcrypt.compare(token, invite.token);

            if(!compare) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`Invitation token is not valid.`));

            const existedUser = await this.userService.findOneByUsernameOrEmail({email : invite.email,username :invite.email});
            
            if(existedUser && existedUser.userType !== EUserTypes.DOCTOR) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`User already existed with type : ${existedUser.userType} please contact support.`));
            
            if(existedUser){
                await invite.update(
                    {
                        acceptedAt : new Date(),
                        status : ECommonStatus.APPROVED,
                        doctorId : existedUser.id
                    }
                    );
                await this.userService.createUserClinicAssociation(existedUser.id,invite.clinicId);
                await this.sendInvitationAcceptedEmailToClinic(invite.clinicId, existedUser);
                await this.cloneProfileToClinicProfile(existedUser.id,invite.clinicId)

                return new GeneralResponseDto(HttpStatus.OK, String(`Invitation has been accepted`));
            }

            return new GeneralResponseDto(HttpStatus.BAD_GATEWAY, String(`Oops! Something went wrong please contact support.`));

        } catch (err) {
            throw new Error(err);
        }
    }


    async createOrUpdateDoctorDefaultProfile(body : CreateDoctorDefaultProfileServiceDto){
        try {
            
            const {doctorId, doctorType} = body;

            const user = await this.userService.findOneByPK(doctorId);

            if(!user) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Bad request! Account does not exist.`));

            const doctorTypeObj = await this.doctorTypeService.findOne(doctorType);

            if(!doctorTypeObj) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Bad request! Invalid doctor type.`));

            const profile = await this.doctorDefaultProfileModel.findOne({where : {doctorId}});

            if(profile){
                await profile.update(body);
                return new GeneralResponseDto(HttpStatus.OK, String(`Default profile updated successfully.`))
            }

            await this.doctorDefaultProfileModel.create({...body});
            return new GeneralResponseDto(HttpStatus.OK, String(`Default profile updated successfully.`))

        } catch (err) {
            throw new Error(err);
        }
    }


    async cloneProfileToClinicProfile(doctorId : number, clinicId : number){
        try {
            
            const profile = await this.doctorDefaultProfileModel.findOne({
                where  : {doctorId}
            });

            if(!profile) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Default profile is not configured.`));

            const {eCheckup, eCheckupFee,id, offDays, ...clinicProfileData} = profile;

            const checkClinicProfile = await this.doctorClinicProfileModel.findOne({
                where:{
                    doctorId,
                    clinicId
                }
            });

            if(checkClinicProfile) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Clinic profile is already existed.`))

            await this.doctorClinicProfileModel.create({
                clinicId,
                doctorId,
                appointmentNotificationEmail : profile.appointmentNotificationEmail,
                appointmentNotificationPhone : profile.appointmentNotificationPhone,
                onlineAppointment : profile.onlineAppointment,
                preOnlineAppointmentFeeCharged : profile.preOnlineAppointmentFeeCharged,
                onlineAppointmentFee : profile.onlineAppointmentFee,
                specialization: profile.specialization,
                doctorType : profile.doctorType
            })

            return new GeneralResponseDto(HttpStatus.OK, String(`Default profile cloned to clinic profile.`));


        } catch (err) {
            throw new Error(err);
        }
    }

    async createOrUpdateDoctorClinicProfile(body : CreateDoctorClinicProfileServiceDto){
        try {
            
            const {doctorId, doctorType,clinicId} = body;

            const user = await this.userService.findOneByPK(doctorId);

            if(!user) return new GeneralResponseDto(HttpStatus.BAD_REQUEST, String(`Bad request! Account does not exist.`));

            const doctorTypeObj = await this.doctorTypeService.findOne(doctorType);

            if(!doctorTypeObj) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Bad request! Invalid doctor type.`));

            const clinic = await this.clinicService.findOne(clinicId);

            if(!clinic) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Bad request! Invalid clinic.`));

            const connection = await this.doctorInviteModel.findOne({
                where : {
                    clinicId,
                    [Op.or] : {
                        doctorId,
                        email : user.email,
                    },
                    [Op.not] :{
                        acceptedAt : null
                    } 
                }
            });

            if(!connection) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`You are not connected to the clinic ID : ${clinicId}`));

            const profile = await this.doctorClinicProfileModel.findOne({where : {doctorId, clinicId}});

            if(profile){
                await profile.update(body);
                return new GeneralResponseDto(HttpStatus.OK, String(`Clinic profile updated successfully.`))
            }

            await this.doctorClinicProfileModel.create({...body});
            return new GeneralResponseDto(HttpStatus.OK, String(`Clinic profile updated successfully.`))

        } catch (err) {
            throw new Error(err);
        }
    }


    async getDefaultProfile(doctorId : number){
        try {
            
            return await this.doctorDefaultProfileModel.findOne({
                where  : { doctorId }
            })

        } catch (err) {
            throw new Error(err);
        }
    }


    async getClinicProfile(doctorId : number, clinicId:number){
        try {
            
            return await this.doctorClinicProfileModel.findOne({
                where :{
                    clinicId,
                    doctorId
                }
            });

        } catch (err) {
            throw new Error(err);
        }
    }

    async getClinicProfiles(doctorId : number){
        try {
            
            return await this.doctorClinicProfileModel.findAll({
                where : {
                    doctorId
                }
            })

        } catch (err) {
            throw new Error(err);
        }
    }

    async getClinicDoctors(clinicId : number, params  : GetClinicDoctorRequestDto){
        try {
            const {search} = params
            const {limit,offset,page} = this.paginationService.getPaginationParams(params.page, params.limit);
            let where : any = {clinicId};

            if(search){
                where = {
                    ...where,
                    [Op.or] : {
                        specialization : {
                            [Op.like] : `%${search}%`
                        },
                        appointmentNotificationEmail : {
                            [Op.like] : `%${search}%`
                        },
                        appointmentNotificationPhone : {
                            [Op.like] : `%${search}%`
                        },
                        '$users.firstName' : {
                            [Op.like] : `%${search}%`
                        },
                        '$users.lastName' : {
                            [Op.like] : `%${search}%`
                        },
                        '$users.email' : {
                            [Op.like] : `%${search}%`
                        },
                        '$users.username' : {
                            [Op.like] : `%${search}%`
                        },
                        '$users.nickName' : {
                            [Op.like] : `%${search}%`
                        },
                    }
                }
            }


            const {rows, count} = await this.doctorClinicProfileModel.findAndCountAll({
                distinct : true,
                where : {
                    ...where
                },
                include : [
                    {
                        model : User
                    },
                    {
                        model : DoctorType
                    }
                ]
            });

            const meta = new PaginationMetaDto(page, limit, count);
            return new PaginationResponseDto(rows, meta)

        } catch (err) {
            throw new Error(err);
        }
    }
    
}