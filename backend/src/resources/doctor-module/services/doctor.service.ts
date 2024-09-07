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

@Injectable()
export class DoctorService {
    constructor(
        private readonly userService : UserService,
        private readonly clinicService : ClinicService,
        private readonly mailService : MailService,
        @Inject(DoctorInvite.name) private readonly doctorInviteModel : typeof DoctorInvite,
        

    ){}

    async acceptInviteNewDoctor(body : AcceptInviteNewDoctor){
        try {
            
            const {token, email,clinicId ,...userData} = body;
            console.log(body);
            const check = await this.doctorInviteModel.findOne({
                where : {email, clinicId, acceptedAt : null, status : ECommonStatus.PENDING}
            });

            console.log("passed 1");

            if(!check) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`This invitation has been expired.`));

            const compare = await bcrypt.compare(token, check.token);

            if(!compare) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`Invitation token is not valid.`));

            const user = await this.userService.create({...userData, email});
            console.log("passed 2");

            if((user instanceof GeneralResponseDto && user.status === HttpStatus.CONFLICT) || (user instanceof User && user.id)){
                const existedUser = await this.userService.findOneByUsernameOrEmail({email,username :email});
                if(existedUser && existedUser.userType !== EUserTypes.DOCTOR) return new GeneralResponseDto(HttpStatus.CONFLICT, String(`User already existed with type : ${existedUser.userType} please contact support.`));
                if(existedUser){
                    await this.doctorInviteModel.update(
                        {
                            acceptedAt : new Date(),
                            status : ECommonStatus.APPROVED
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

    
}