import { Gender } from "~/constants/enums";
import { BaseEntity } from "./base.entity";
import { Role } from "~/constants/roles";

export interface User extends BaseEntity {
    code: string;
    name: string;
    phoneNumber: string;
    gender?: Gender;
    email?: string;
    role: Role;
}

export interface Staff extends User {
    userName: string;
    email: string;
    address: string;
    profilePictureUrl: string;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    roles: Role;
}

export interface Patient extends User {
    dob: Date;
    identityCard: string;
    addressDetail: string;
    province: string;
    district: string;
    ward: string;
    isPregnant: boolean;
    isForeigner: boolean;
}

export interface PatientSummary {
    id: number;
    name: string;
    dob: Date;
    email: string;
    phoneNumber: string;
}
