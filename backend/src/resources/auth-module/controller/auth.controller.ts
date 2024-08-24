import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";

@ApiTags("Authentication Module")
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
}