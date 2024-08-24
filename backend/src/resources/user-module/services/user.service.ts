import { Injectable, Inject } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()

export class UserService {
    constructor(
        @Inject(User.name) private readonly userModel : User
    ){}

    async create(){
        try {
            
        } catch (err) {
            throw new Error(err);
        }
    }
}