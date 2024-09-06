import { Module } from "@nestjs/common";
import { ClinicController } from "./controllers/clinic.controller";
import { ClinicService } from "./services/clinic.service";
import { clinicProviders } from "./porviders/clinic.providers";
import { UserModule } from "../user-module/user.module";
import { MailModule } from "@src/shared/modules/mail/mail.module";

@Module({
    controllers : [ClinicController],
    imports  :[
        UserModule,
        MailModule
    ],
    providers : [ClinicService,
        ...clinicProviders
    ],
    exports : [ClinicService],
})

export class ClinicModule{}