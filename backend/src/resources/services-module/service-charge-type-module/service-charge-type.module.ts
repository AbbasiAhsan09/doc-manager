import { Module } from "@nestjs/common";
import { ServiceChargeTypeController } from "./controller/service-charge-type.controller";
import { ServiceChargeTypeService } from "./services/service-charge-type.service";
import { serviceChargeTypeProviders } from "./providers/service-charge-type.providers";
import { ProtectedRouteGuard } from "@src/resources/auth-module/guards/protected-route.guard";

@Module({
    imports : [],
    controllers : [ServiceChargeTypeController],
    providers : [
        ServiceChargeTypeService,
        ...serviceChargeTypeProviders,
        ProtectedRouteGuard
    ],
    exports : [ServiceChargeTypeService]
})

export class ServiceChargeTypeModule{}