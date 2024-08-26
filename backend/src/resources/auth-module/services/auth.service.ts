import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { UserService } from "src/resources/user-module/services/user.service";
import { GeneralResponseDto } from "src/shared/dto/general-response.dto";
import * as bcrypt from 'bcrypt'
import { User } from "src/resources/user-module/entities/user.entity";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly userService : UserService,
        private readonly configService : ConfigService
    ){}

    async login(body : LoginRequestDto){
        try {
            
            const {emailOrUsername,password} = body;

            const user = await this.userService.findOneByUsernameOrEmail({email : emailOrUsername, username : emailOrUsername});

            if(!user) return new GeneralResponseDto(HttpStatus.NOT_FOUND, String(`Username or password is invalid.`));

            const checkPassword = await bcrypt.compare(password, user.password);
            
            if(!checkPassword) return new GeneralResponseDto(HttpStatus.UNAUTHORIZED, String(`Username or password is invalid.`));

            const token = await this.signIn(user);
            
            return new LoginResponseDto(token, user);

        } catch (err) {
            throw new Error(err);
        }
    }

    async signIn(user : User){
        try {
            return  this.jwtService.sign({id : user.id, email : user.email},{
            expiresIn : this.configService.get("jwt.expiresIn")
            })
        } catch (err) {
            throw new Error(err);
        }
    }
}