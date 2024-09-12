import { Patient } from "../entities/patient.entity";

export const patientProviders = [
    {
        provide : Patient.name,
        useValue : Patient,
    }
]