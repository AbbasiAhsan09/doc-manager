import { Clinic } from "../entities/clinic.entity";
import { DoctorInvite } from "../entities/doctor-invites.entity";

export const clinicProviders = [
    {
        provide : Clinic.name,
        useValue : Clinic
    },
    {
        provide : DoctorInvite.name,
        useValue : DoctorInvite
    }
]