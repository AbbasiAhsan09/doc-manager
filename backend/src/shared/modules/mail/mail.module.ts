import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports : [
        
    ],
    providers : [
        MailService
    ],
    exports : [
        MailService
    ]
})
export class MailModule {}