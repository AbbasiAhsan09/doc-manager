import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "../user-module/user.module";
import { AccessTokenStrategy } from "./stratagies/access-token.strategy";
import { RefreshTokenStrategy } from "./stratagies/refresh-token.strategy";
import { APP_GUARD } from "@nestjs/core";
import { ProtectedRouteGuard } from "./guards/protected-route.guard";

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
    providers : [
        AuthService, 
        AccessTokenStrategy,
        ProtectedRouteGuard
    ],
    exports : [AuthService]
})

export class AuthModule{}