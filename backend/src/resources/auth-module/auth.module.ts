import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "../user-module/user.module";

@Module({
    imports : [
        JwtModule.registerAsync({   
            useFactory : (configService : ConfigService) => ({
                secret : configService.get("jwt.secret"),
                signOptions : {
                    expiresIn : configService.get("jwt.expiresIn")
                }
            }),
            inject : [ConfigService]
        }),
        UserModule
    ],
    controllers : [AuthController],
    providers : [AuthService],
    exports : [AuthService]
})

export class AuthModule{}