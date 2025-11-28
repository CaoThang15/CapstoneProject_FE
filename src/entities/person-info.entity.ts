import { Role } from "~/constants/roles";
import { BaseEntity } from "./base.entity";

export class User extends BaseEntity {
    address: string;
    avatar: string;
    email: string;
    name: string;
    phone: string;
    province: string;
    roleId: Role;
    ward: string;

    get roleName(): string {
        switch (this.roleId) {
            case Role.Admin:
                return "Admin";
            case Role.Seller:
                return "Seller";
            case Role.Buyer:
                return "Buyer";
            default:
                return "Unknown";
        }
    }
}
