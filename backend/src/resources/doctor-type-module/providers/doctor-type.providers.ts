import { DoctorType } from "../entities/doctor-type.entity";

export const doctorTypeProviders = [
    {
        provide : DoctorType.name,
        useValue : DoctorType
    }
]