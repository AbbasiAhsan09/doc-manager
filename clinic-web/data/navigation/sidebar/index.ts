import { NavItem } from "@/types/utils/navigation"

export const navItems:NavItem[] = [
    {
        name : 'Dashboard',
        icon : 'ic:round-home',
        link : '/login',
        tooltip : 'Dashboard'
    },
    {
        name : 'Patients',
        icon : 'mdi:patient',
        link : '/patients',
        tooltip : 'Patients'
    },
    {
        name : 'Doctors',
        icon : 'mdi:doctor',
        link : '/doctors',
        tooltip : 'Dashboard'
    },
    {
        name : 'Users',
        icon : 'mdi:users',
        link : '/',
        tooltip : 'Users'
    },
    {
        name : 'Appointments',
        icon : 'mdi:calendar',
        link : '/',
        tooltip : 'Users'
    },
    {
        name : 'Settings',
        icon : 'weui:setting-filled',
        link : '/',
        tooltip : 'Users'
    }
]
