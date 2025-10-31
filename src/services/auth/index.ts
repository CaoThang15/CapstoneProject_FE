import { endpoints } from "~/constants/endpoints";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IBaseApiResponse } from "~/libs/axios/types";
import {
    LogOutResponse,
    RefreshTokenResponse,
    ResetPasswordResponse,
    TLoginRequest,
    TLoginResponse,
    TRegisterRequest,
    TRegisterResponse,
    TVerifyLoginOtpResponse,
    TVerifyOtpRequest,
    TVerifyRegisterOtpResponse,
} from "./types";
import { User } from "~/entities";

const login = async (params: TLoginRequest): Promise<IBaseApiResponse<TLoginResponse>> => {
    return await callApi<TLoginResponse>({
        url: endpoints.auth.login,
        method: HttpMethod.POST,
        data: params,
    });
};

const verifyLoginOtp = async (payload: TVerifyOtpRequest): Promise<IBaseApiResponse<TVerifyLoginOtpResponse>> => {
    return await callApi<TVerifyLoginOtpResponse>({
        url: endpoints.auth.verifyLoginOtp,
        method: HttpMethod.POST,
        data: payload,
    });
};

const refreshToken = async (): Promise<IBaseApiResponse<RefreshTokenResponse>> => {
    return await callApi<RefreshTokenResponse>({
        url: endpoints.auth.refreshToken,
        method: HttpMethod.POST,
        data: null,
    });
};

const getCurrentUser = async (): Promise<IBaseApiResponse<User>> => {
    return await callApi<User>({
        url: endpoints.auth.currentUser,
        method: HttpMethod.GET,
    });
};

const logout = async (): Promise<IBaseApiResponse<LogOutResponse>> => {
    return await callApi<LogOutResponse>({
        url: endpoints.auth.logout,
        method: HttpMethod.POST,
        data: null,
    });
};

const resetPassword = async (payload: { email: string }): Promise<IBaseApiResponse<ResetPasswordResponse>> => {
    return await callApi<ResetPasswordResponse>({
        url: endpoints.auth.resetPassword,
        method: HttpMethod.POST,
        data: payload,
    });
};

const register = async (payload: TRegisterRequest): Promise<IBaseApiResponse<TRegisterResponse>> => {
    return await callApi<TRegisterResponse>({
        url: endpoints.auth.register,
        method: HttpMethod.POST,
        data: payload,
    });
};

const verifyRegisterOtp = async (payload: TVerifyOtpRequest): Promise<IBaseApiResponse<TVerifyRegisterOtpResponse>> => {
    return await callApi<TVerifyRegisterOtpResponse>({
        url: endpoints.auth.verifyRegisterOtp,
        method: HttpMethod.POST,
        data: payload,
    });
};

export const authService = {
    login,
    logout,
    refreshToken,
    getCurrentUser,
    resetPassword,
    register,
    verifyLoginOtp,
    verifyRegisterOtp,
};
