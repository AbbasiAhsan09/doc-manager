import { Controller } from "@nestjs/common";
import { ServiceGroupService } from "../services/service-group.service";

@Controller("service-groups")
export class ServiceGroupController {
    constructor(private readonly serviceGroupService : ServiceGroupService){}
}