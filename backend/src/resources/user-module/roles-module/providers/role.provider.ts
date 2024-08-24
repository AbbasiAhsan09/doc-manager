import { Role } from "../entities/role.entity";

export const roleProviders = [
    {
        provide : Role.name,
        useValue  : Role
    }
]