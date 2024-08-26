import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";

@ApiTags("Authentication Module")
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post("/login")
    async login(@Res() res : Response, @Body() body : LoginRequestDto){
        const validate = await this.authService.login(body);
        if(!validate || (validate instanceof GeneralResponseDto && validate.status)) return validate;

        if(validate instanceof LoginResponseDto){
            res.cookie('token',validate.token, {
                httpOnly : true, 
                secure : true,
                sameSite : true,
            })
            
            return res.send(validate);
            
        }

    }
}