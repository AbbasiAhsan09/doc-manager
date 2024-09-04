import { Service } from "../entities/service.entity";

export const serviceProviders = [
    {
        provide: Service.name,
        useValue : Service,
    }
]