import { Module } from "@nestjs/common";
import { DoctorController } from "./controllers/doctor.controller";
import { DoctorService } from "./services/doctor.service";
import { clinicProviders } from "../clinic-module/porviders/clinic.providers";
import { ClinicModule } from "../clinic-module/clinic.module";
import { MailModule } from "@src/shared/modules/mail/mail.module";
import { UserModule } from "../user-module/user.module";
import { doctorProviders } from "./providers/doctor.providers";
import { DoctorTypeModule } from "../doctor-type-module/speciality.module";

@Module({
    controllers : [DoctorController],
    imports : [
        UserModule,
        ClinicModule,
        MailModule,
        DoctorTypeModule
    ],
    providers : [
        DoctorService,
        ...clinicProviders,
        ...doctorProviders
    ],
    exports : [
        DoctorService
    ]
})

export class DoctorModule{}