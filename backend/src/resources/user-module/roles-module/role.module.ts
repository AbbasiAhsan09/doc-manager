import { Module } from "@nestjs/common";
import { RoleController } from "./controller/role.controller";
import { RoleService } from "./services/role.service";
import { roleProviders } from "./providers/role.provider";
import { PaginationService } from "src/shared/services/pagination.service";

@Module({
    imports : [],
    controllers : [RoleController],
    providers : [RoleService,
        ...roleProviders,
        PaginationService
    ],
    exports : [RoleService]
})

export class RoleModule{}