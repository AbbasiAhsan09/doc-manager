import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { RoleModule } from "./roles-module/role.module";
import { userProviders } from "./providers/user.providers";

@Module({
    imports : [RoleModule],
    controllers : [UserController],
    providers : [UserService,
        ...userProviders
    ],
    exports : [UserService]
})

export class UserModule {}