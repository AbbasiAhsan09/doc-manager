import { DoctorClinicProfile } from "../entities/doctor-clinic-profile.entity";
import { DoctorDefaultProfile } from "../entities/doctor-default-profile.entity";

export const doctorProviders = [
    {
        provide : DoctorDefaultProfile.name,
        useValue : DoctorDefaultProfile
    },
    {
        provide : DoctorClinicProfile.name,
        useValue : DoctorClinicProfile
    },
    
]