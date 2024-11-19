import { DoctorAppointment } from "../entities/doctor-appointment.entity";

export const doctorAppointmentProviders = [
    {
        provide : DoctorAppointment.name,
        useValue : DoctorAppointment
    }
];