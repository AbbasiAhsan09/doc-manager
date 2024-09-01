import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { UserService } from '@src/resources/user-module/services/user.service';


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService : UserService
  ) {
    console.log("secret", process.env.JWT_ACCESS_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    
    return await this.userService.findOneByUsernameOrEmail({email: payload.email, username : payload.username});
  }
}