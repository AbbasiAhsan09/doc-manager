import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DoctorAppointment } from "../entities/doctor-appointment.entity";
import { createAppointmentDto } from "../dto/create-appointment.dto";
import * as moment from 'moment';
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";


@Injectable()
export class AppointmentService {
    constructor(
        @Inject(DoctorAppointment.name) private readonly doctorAppointmentModel : typeof DoctorAppointment
    ){}

    async createOnlineAppointment(){

    }

    async createAppointment(data : createAppointmentDto){
        try {
            
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

            if(checkIfAlreadyExist.confirmed){

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
                    clinicId : data.clinicId,
                },
                order : [["id",'DESC']]
            });

            let appointmentNumber = 1;

            if(lastAppointment){
                appointmentNumber = Number(lastAppointment.appointmentNumber) + 1;
            }

            





        } catch (err) {
            throw new Error(err);
        }
    }
}