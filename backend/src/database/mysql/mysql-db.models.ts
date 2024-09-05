import { DoctorType } from "@src/resources/doctor-type-module/entities/doctor-type.entity";
import { Service } from "@src/resources/services-module/entities/service.entity";
import { ServiceChargeType } from "@src/resources/services-module/service-charge-type-module/entities/service-charge-type.entity";
import { ServiceGroup } from "@src/resources/services-module/service-group-module/entities/service-group.entity";
import { Sepciality } from "@src/resources/speciality-module/entities/speciality.entity";
import { ClinicUser } from "@src/resources/user-module/entities/clinic-user.entity";
import { Clinic } from "src/resources/clinic-module/entities/clinic.entity";
import { User } from "src/resources/user-module/entities/user.entity";
import { Role } from "src/resources/user-module/roles-module/entities/role.entity";

export const mysqlDBModels = [
    User,
    Role,
    Clinic,
    ServiceGroup,
    ServiceChargeType,
    Service,
    ClinicUser,
    Sepciality,
    DoctorType
];