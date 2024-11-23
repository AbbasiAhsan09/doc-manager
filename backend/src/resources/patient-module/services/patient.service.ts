import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Patient } from "../entities/patient.entity";
import { CreatePatientFullDto } from "../dto/create-patient.dto";
import { ClinicService } from "@src/resources/clinic-module/services/clinic.service";
import { GeneralResponseDto } from "@src/shared/dto/general-response.dto";
import { padStart } from "@src/shared/utils/number.utils";
import { EUserTypes } from "@src/shared/@enum/user-type.enum";
import { UpdatePatientDto } from "../dto/update-patient.dto";

@Injectable()
export class PatientService {
    constructor(
        @Inject(Patient.name) private readonly patientModel: typeof Patient,
        private readonly clinicService: ClinicService
    ) { }

    async create(body: CreatePatientFullDto) {
        try {

            const { clinicId, doctorId } = body;

            const mrNumber = await this.generateNewMRN(clinicId);

            if (mrNumber instanceof GeneralResponseDto) return mrNumber;

            const doctor = await this.clinicService.findClinicUser(clinicId, doctorId);

            if (!doctor || (doctor && doctor.userType !== EUserTypes.DOCTOR)) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Invalid doctorId please select doctor from the select box.`));


            return await this.patientModel.create({ ...body, mrNumber });

            return mrNumber;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id: number,clinicId : number, body: UpdatePatientDto) {
        try {
            const {doctorId} = body;

            const patient = await this.patientModel.findOne({where : {clinicId, id}});
            if(!patient) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Patient not found`));
            const doctor = await this.clinicService.findClinicUser(clinicId,doctorId);
            if (!doctor || (doctor && doctor.userType !== EUserTypes.DOCTOR)) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Invalid doctorId please select doctor from the select box.`));
            
            delete body.mrNumber;

            await patient.update({...body});

            return new GeneralResponseDto(HttpStatus.OK, String(`Patient updated successfully.`));

        } catch (err) {

        }
    }

    async generateNewMRN(clinicId: number) {
        try {

            const leadingZero = 2;
            const clinic = await this.clinicService.findOne(clinicId);

            if (!clinic) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Invalid clinic ID : ${clinicId} to generate new MRN`))

            // const date = new Date();
            // const [day, month, year] = [date.getDate(), (date.getMonth() + 1), (date.getFullYear() % 100)];

            let MRN: string = "MRN";

            const lastPatient = await this.patientModel.findOne({
                where: {
                    clinicId,
                },
                order: [['id', 'DESC']],
                paranoid: false,
            });

            if (!lastPatient) {
                MRN = MRN + padStart(1, '0', leadingZero);
            } else {
                MRN = MRN + padStart(lastPatient.id + 1, '0', leadingZero);
            }


            return MRN;


        } catch (err) {
            throw new Error(err);
        }
    }


    async findOne(where = {}){
        return await this.patientModel.findOne(where);
    }
}