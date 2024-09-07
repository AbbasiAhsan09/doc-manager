import { Module } from "@nestjs/common";
import { DoctorController } from "./controllers/doctor.controller";
import { DoctorService } from "./services/doctor.service";
import { clinicProviders } from "../clinic-module/porviders/clinic.providers";
import { ClinicModule } from "../clinic-module/clinic.module";
import { MailModule } from "@src/shared/modules/mail/mail.module";
import { UserModule } from "../user-module/user.module";

@Module({
    controllers : [DoctorController],
    imports : [
        UserModule,
        ClinicModule,
        MailModule
    ],
    providers : [
        DoctorService,
        ...clinicProviders
    ],
    exports : [
        DoctorService
    ]
})

export class DoctorModule{}