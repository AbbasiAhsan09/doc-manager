import { EMobileNotification } from "@src/shared/@enum/mobile-notification.dto";

export class NotifyMobileUser{
    type : EMobileNotification;
    number : string;
    text : string
}