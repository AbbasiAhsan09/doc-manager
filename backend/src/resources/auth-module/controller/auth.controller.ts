import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import { ProtectedRouteGuard } from "../guards/protected-route.guard";
import { UserTypes } from "../decorators/user-type.decorator";
import { EUserTypes } from "src/shared/@enum/user-type.enum";

@ApiTags("Authentication Module")
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post("/login")
    async login(@Res() res : Response, @Body() body : LoginRequestDto){
        const validate = await this.authService.login(body);

        if(validate instanceof LoginResponseDto){
            res.cookie('token',validate.token, {
                httpOnly : true, 
                secure : true,
                sameSite : true,
            })
        }
        
        return res.send(validate);

    }

    @ApiBearerAuth()
    @UserTypes(EUserTypes.ADMIN, EUserTypes.CLINIC)
    @UseGuards(ProtectedRouteGuard)
    @Get('/test')
    test(){
        return 'test';
    }
}