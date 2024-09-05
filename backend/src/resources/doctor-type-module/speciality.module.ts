import { Module } from "@nestjs/common";
import { DoctorTypeService } from "./services/doctor-type.service";
import { doctorTypeProviders } from "./providers/doctor-type.providers";
import { DoctorTypeController } from "./controllers/doctor-type.controller";


@Module({
    imports : [],
    controllers : [
       DoctorTypeController
    ],
    providers : [
        DoctorTypeService,
        ...doctorTypeProviders
    ],
    exports : [DoctorTypeService]
})

export class DoctorTypeModule{}