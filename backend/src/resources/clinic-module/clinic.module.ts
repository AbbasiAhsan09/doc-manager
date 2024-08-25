import { Module } from "@nestjs/common";
import { ClinicController } from "./controllers/clinic.controller";
import { ClinicService } from "./services/clinic.service";
import { clinicProviders } from "./porviders/clinic.providers";
import { UserModule } from "../user-module/user.module";

@Module({
    controllers : [ClinicController],
    imports  :[
        UserModule
    ],
    providers : [ClinicService,
        ...clinicProviders
    ],
    exports : [ClinicService],
})

export class ClinicModule{}