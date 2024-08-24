import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";

@Module({
    imports : [],
    controllers : [AuthController],
    providers : [AuthService],
    exports : [AuthService]
})

export class AuthModule{}