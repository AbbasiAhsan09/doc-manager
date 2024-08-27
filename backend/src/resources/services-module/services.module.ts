import { Module } from "@nestjs/common";
import { ServiceService } from "./services/service.service";
import { ServiceController } from "./controller/service.controller";
import { ServiceChargeTypeModule } from "./service-charge-type-module/service-charge-type.module";
import { ServiceGroupModule } from "./service-group-module/service-group.module";

@Module({
    controllers : [ServiceController],
    imports : [
        ServiceChargeTypeModule,
        ServiceGroupModule
    ],
    providers : [ServiceService],
    exports : [ServiceService],
})


export class ServiceModule{}