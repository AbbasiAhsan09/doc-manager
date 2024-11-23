import { Injectable } from "@nestjs/common";
import { NotifyMobileUser } from "./notify-user.dto";

@Injectable()
export class MobileNotificationService {
    constructor(){}


    async notify(data : NotifyMobileUser){
        try {
            console.log('data.number', data.number)
            console.log('data.text', data.text)
        } catch (err) {
            throw new Error(err);
        }
    }
}