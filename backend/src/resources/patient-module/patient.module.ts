import { Module } from "@nestjs/common";
import { PatientController } from "./controllers/patient.controller";
import { PatientService } from "./services/patient.service";
import { patientProviders } from "./providers/patient.providers";
import { ClinicModule } from "../clinic-module/clinic.module";

@Module({
    imports :[
        ClinicModule
    ],
    controllers : [
        PatientController
    ],
    providers : [
        PatientService,
        ...patientProviders
    ],
    exports : [PatientService]
})

export class PatientModule {}