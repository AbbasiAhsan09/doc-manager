import { Module } from "@nestjs/common";
import { ServiceService } from "./services/service.service";
import { ServiceController } from "./controller/service.controller";
import { ServiceChargeTypeModule } from "./service-charge-type-module/service-charge-type.module";
import { ServiceGroupModule } from "./service-group-module/service-group.module";
import { serviceProviders } from "./providers/service.providers";

@Module({
    controllers : [ServiceController],
    imports : [
        ServiceChargeTypeModule,
        ServiceGroupModule
    ],
    providers : [
        ServiceService,
        ...serviceProviders
    ],
    exports : [ServiceService],
})


export class ServiceModule{}