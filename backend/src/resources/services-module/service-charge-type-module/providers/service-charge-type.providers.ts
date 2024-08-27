import { ServiceChargeType } from "../entities/service-charge-type.entity";

export const serviceChargeTypeProviders = [
    {
        provide : ServiceChargeType.name,
        useValue : ServiceChargeType
    }
]
