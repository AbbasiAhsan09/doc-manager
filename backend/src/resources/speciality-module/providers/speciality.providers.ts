import { Sepciality } from "../entities/speciality.entity";

export const specialityProviders = [
    {
        provide : Sepciality.name,
        useValue : Sepciality
    }
]