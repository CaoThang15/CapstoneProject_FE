import { Role } from "~/constants/roles";
import { User } from "~/entities";

export type TLoginRequest = {
    email: string;
    password: string;
};

export type TLoginResponse = {
    isSuccess: boolean;
    message: string;
};

export type TRegisterRequest = {
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
};

export type TRegisterResponse = null;

export type TVerifyOtpRequest = {
    email: string;
    otp: string;
};

export type TVerifyLoginOtpResponse = {
    accessToken: string;
    userDto: User;
};

export type TVerifyRegisterOtpResponse = {
    accessToken: string;
    userDto: User;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};

export type RefreshTokenResponse = {
    IsSuccess: boolean;
    Message: string;
};

export type LogOutResponse = {
    IsSuccess: boolean;
    Message: string;
};

export type ResetPasswordResponse = {
    IsSuccess: boolean;
    Message: string;
};

export interface ConfirmPasswordRequest {
    password: string;
}

export interface ConfirmPasswordResponse {
    isSuccess: boolean;
    message: string;
}
