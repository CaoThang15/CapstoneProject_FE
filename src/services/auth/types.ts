export type TLoginRequest = {
    userName: string;
    password: string;
};

export type TLoginResponse = {
    isSuccess: boolean;
    message: string;
};

export type TRegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    phone: string;
    location: string;
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
