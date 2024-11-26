export type NavItem = {
    name : string;
    tooltip ? : string;
    link : string;
    icon ?: string
    children ?: NavItem[]
}