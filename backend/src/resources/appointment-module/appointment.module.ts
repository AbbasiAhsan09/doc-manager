import { Module } from "@nestjs/common";
import { AppointmentController } from "./controllers/appointment.controller";
import { doctorAppointmentProviders } from "./providers/doctor-appointment.providers";
import { AppointmentService } from "./services/appointment.service";
import { PatientModule } from "../patient-module/patient.module";
import { UserModule } from "../user-module/user.module";
import { MobileNotificationModule } from "@src/shared/modules/mobile-notification/mobile-notification.module";
import { ClinicModule } from "../clinic-module/clinic.module";
import { DoctorModule } from "../doctor-module/doctor.module";
import { MailModule } from "@src/shared/modules/mail/mail.module";

@Module({
    controllers : [AppointmentController],
    providers :[
        AppointmentService,
        ...doctorAppointmentProviders,
    ],
    exports : [
        AppointmentService
    ],
    imports : [
        PatientModule,
        UserModule,
        MobileNotificationModule,
        ClinicModule,
        DoctorModule,
        MailModule
    ]
})

export class AppointmentModule {}