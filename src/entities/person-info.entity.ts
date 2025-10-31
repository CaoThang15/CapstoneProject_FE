import { Role } from "~/constants/roles";
import { BaseEntity } from "./base.entity";

export interface User extends BaseEntity {
    address: string;
    avatar: string;
    email: string;
    name: string;
    phone: string;
    province: string;
    roleId: Role;
    ward: string;
}
