import { Module } from "@nestjs/common";
import { ServiceGroupController } from "./controller/service-group.controller";
import { ServiceGroupService } from "./services/service-group.service";
import { serviceGroupProviders } from "./providers/service-group.providers";

@Module({
    imports : [],
    controllers : [ServiceGroupController],
    providers : [
        ServiceGroupService,
        ...serviceGroupProviders
    ],
    exports : [ServiceGroupService]
})
export class ServiceGroupModule{}