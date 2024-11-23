import { Module } from "@nestjs/common";
import { MobileNotificationService } from "./mobile-notification.service";

@Module({
    providers : [MobileNotificationService],
    exports  : [MobileNotificationService]
})

export class MobileNotificationModule{}