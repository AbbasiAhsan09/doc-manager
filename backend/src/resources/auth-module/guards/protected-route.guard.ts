import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt.guard";
import { Observable } from "rxjs";
import { EUserTypes } from "src/shared/@enum/user-type.enum";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ProtectedRouteGuard extends JwtAuthGuard implements CanActivate {

    constructor(private reflector: Reflector){
        super();
    }

    async canActivate(context: ExecutionContext) : Promise<boolean> {
        // return true;
        const jwtActive = await super.canActivate(context);
        
        if(!jwtActive) return false;
        
        const request = context.switchToHttp().getRequest();
        const user = request?.user?.dataValues;

        if(!user) return false;
        
        const userTypes = this.reflector.get<EUserTypes[]>("userTypes", context.getHandler());
        
        if(userTypes.length < 1 || !userTypes) return true;

        return userTypes.includes(user.userType);
    }
}