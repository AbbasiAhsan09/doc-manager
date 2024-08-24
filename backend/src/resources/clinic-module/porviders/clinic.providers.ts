import { Clinic } from "../entities/clinic.entity";

export const clinicProviders = [
    {
        provide : Clinic.name,
        useValue : Clinic
    }
]