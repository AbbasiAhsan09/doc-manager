import { ServiceGroup } from "../entities/service-group.entity";

export const serviceGroupProviders = [
    {
        provide : ServiceGroup.name,
        useValue : ServiceGroup
    }
]
