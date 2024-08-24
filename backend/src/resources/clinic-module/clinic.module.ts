import { Module } from "@nestjs/common";
import { ClinicController } from "./controllers/clinic.controller";
import { ClinicService } from "./services/clinic.service";
import { clinicProviders } from "./porviders/clinic.providers";

@Module({
    controllers : [ClinicController],
    imports  :[

    ],
    providers : [ClinicService,
        ...clinicProviders
    ],
    exports : [ClinicService],
})

export class ClinicModule{}