import { ClinicUser } from "../entities/clinic-user.entity";
import { User } from "../entities/user.entity";

export const userProviders = [
    {
        provide  : User.name,
        useValue :  User
    },
    {
        provide  : ClinicUser.name,
        useValue :  ClinicUser
    }
]