import { Module } from "@nestjs/common";
import { SpecialityService } from "./services/speciality.service";
import { specialityProviders } from "./providers/speciality.providers";
import { SpecialityController } from "./controllers/speciality.controller";

@Module({
    imports : [],
    controllers : [
        SpecialityController
    ],
    providers : [
        SpecialityService,
        ...specialityProviders
    ],
    exports : [SpecialityService]
})

export class SpecialityModule{}