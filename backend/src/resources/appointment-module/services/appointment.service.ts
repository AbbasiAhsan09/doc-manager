import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DoctorAppointment } from "../entities/doctor-appointment.entity";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { PatientService } from "@src/resources/patient-module/services/patient.service";
import { UserService } from "@src/resources/user-module/services/user.service";
import { MobileNotificationService } from "@src/shared/modules/mobile-notification/mobile-notification.service";
import { EMobileNotification } from "@src/shared/@enum/mobile-notification.dto";
import { DoctorService } from "@src/resources/doctor-module/services/doctor.service";
import { ClinicService } from "@src/resources/clinic-module/services/clinic.service";
import { addLeadingZeros } from "@src/shared/utils/string.util";
import * as moment from "moment";
import { MailService } from "@src/shared/modules/mail/mail.service";
import { EAppointmentSource } from "@src/shared/@enum/appointment-source.enum";



@Injectable()
export class AppointmentService {
    constructor(
        @Inject(DoctorAppointment.name) private readonly doctorAppointmentModel : typeof DoctorAppointment,
        private readonly patientService : PatientService,
        private readonly userService : UserService,
        private readonly mobileNotificationService : MobileNotificationService,
        private readonly doctorService : DoctorService,
        private readonly clinicService  :ClinicService,
        private readonly mailService : MailService
    ){}

    async createOnlineAppointment(){

    }

    async createAppointment(data : CreateAppointmentDto){
        try {

            const {clinicId} = data;

            if (moment(data.appointmentDate).isBefore(moment(), 'day')) {
                return new GeneralResponseDto(
                  HttpStatus.BAD_REQUEST,
                  'Date cannot be less than today'
                );
              }
              

            const clinic = await this.clinicService.findOne(clinicId);

            if(!clinic){
                return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Clinic ID is invalid contact support.`));
            }

            const patient = await this.patientService.findOne({where : {
                id : data.patientId,
                clinicId,
            }});

          

            if(!patient){
                return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Patient not found.`));
            }

            const doctor = await this.userService.findClinicUser(clinicId, data.doctorId);


            if(!doctor){
                return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Doctor not found`));
            }

            const doctorClinicProfile = await this.doctorService.getClinicProfile(doctor.id, clinicId);

            if(!doctorClinicProfile.onlineAppointment && data.source === EAppointmentSource.Online){
                
                return new GeneralResponseDto(HttpStatus.BAD_REQUEST,String(`Doctor is not avaialble for online appointment at this location`));
            }

            
            
            const checkIfAlreadyExist = await this.doctorAppointmentModel.findOne({
                where : {
                    doctorId : data.doctorId,
                    patientId : data.patientId,
                    appointmentDate : data.appointmentDate,
                    cancelledAt : null,
                    cancelledById : null,
                    source : data.source,
                    clinicId : data.clinicId
                }
            });

            if(checkIfAlreadyExist?.confirmed){

                return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Appointment already exist and confirmed.`));
            }

            if(checkIfAlreadyExist){

                return new GeneralResponseDto(HttpStatus.CONFLICT, String(`Appointment already exist please cancel / edit the existing appointment.`));
            }

            const lastAppointment = await this.doctorAppointmentModel.findOne({
                where : {
                    doctorId : data.doctorId,
                    appointmentDate : data.appointmentDate,
                    cancelledAt : null,
                    cancelledById : null,
                    clinicId : clinicId,
                },
                order : [["id",'DESC']]
            });

            let appointmentNumber = 1;

            if(lastAppointment){
                appointmentNumber = Number(lastAppointment.appointmentNumber) + 1;
                
            }

            const appointment = await this.doctorAppointmentModel.create({...data, appointmentNumber});

            if(!appointment){
                return new GeneralResponseDto(HttpStatus.INTERNAL_SERVER_ERROR,String(`Something went wrong! Failed to create appointment. Please contact support / Try again`));
            }

            // Notify Patient
            if(patient.contact || patient.emergencyContact){
                await this.mobileNotificationService.notify({
                    number : (patient.contact || patient.emergencyContact), 
                    text : String(`Appointment has been confirmed on dated : ${moment(appointment.appointmentDate).format('M-D-Y')}. Token no: ${addLeadingZeros(2,appointment.appointmentNumber)} with Dr. ${doctor.firstName +' ' +doctor.lastName}`),
                    type : EMobileNotification.PATIENT_APPOINTMENT
                })
            }

           

            // Notify Doctor
            if(doctorClinicProfile && doctorClinicProfile.appointmentNotificationPhone){
                await this.mobileNotificationService.notify({
                    number : doctorClinicProfile.appointmentNotificationPhone,
                    text : String(`You have confirmed appointmnet at ${clinic.name} on dated : ${moment(appointment.appointmentDate).format('M-D-Y')}. Token no. ${addLeadingZeros(2,appointment.appointmentNumber)} Patient: ${patient.firstName +' '+patient.middleName+' '+ patient.lastName}`),
                    type : EMobileNotification.DOCTOR_APPOINTMENT
                })
            }else{
                if(doctor.contact){
                    await this.mobileNotificationService.notify({
                        number : doctor.contact,
                        text : String(`You have confirmed appointmnet at ${clinic.name} on dated : ${moment(appointment.appointmentDate).format('M-D-Y')}. Token no. ${addLeadingZeros(2,appointment.appointmentNumber)} Patient: ${patient.firstName +' '+patient.middleName+' '+ patient.lastName}`),
                        type : EMobileNotification.DOCTOR_APPOINTMENT
                    }) 
                }
            }


            // notification email to doctor
            if(doctorClinicProfile.appointmentNotificationEmail){
                await this.mailService.sendMail({
                    subject : String(`${clinic.name} - Appointment confirmation`),
                    to : [{email : doctorClinicProfile.appointmentNotificationEmail, name : String(doctor.firstName+" "+doctor.lastName)}],
                    text : String(`You have confirmed appointmnet at ${clinic.name} on dated : ${moment(appointment.appointmentDate).format('M-D-Y')}. 
                    Token no. ${addLeadingZeros(2,appointment.appointmentNumber)} Patient: ${patient.firstName +' '+patient.middleName+' '+ patient.lastName}`),
                    attachments : [],
                    from : ''
                })
            }

            return new GeneralResponseDto(HttpStatus.CREATED, String(`Appointment created`), appointment);
            
        } catch (err) {
            throw new Error(err);
        }
    }
}