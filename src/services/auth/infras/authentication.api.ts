import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";
import { endpoints } from "~/constants/endpoints";
import { ConfirmPasswordRequest, ConfirmPasswordResponse } from "../types";
import { ResetPasswordRequest, VerifyForgotPasswordOtpResponse } from "./types";

const confirmPassword = async (data: ConfirmPasswordRequest) => {
    return await callApi<ConfirmPasswordResponse>({
        url: endpoints.auth.confirmPassword,
        method: HttpMethod.POST,
        data,
    });
};

const sendForgotPasswordOtp = async (email: string) => {
    return await callApi({
        url: endpoints.auth.forgotPassword,
        method: HttpMethod.POST,
        data: { email },
    });
};

const verifyForgotPasswordOtp = async (email: string, otp: string) => {
    return await callApi<VerifyForgotPasswordOtpResponse>({
        url: endpoints.auth.verifyForgotPasswordOtp,
        method: HttpMethod.POST,
        data: { email, otp },
    });
};

const resetPassword = async (data: ResetPasswordRequest) => {
    return await callApi({
        url: endpoints.auth.resetPassword,
        method: HttpMethod.POST,
        data,
    });
};

export const authenticationApi = {
    confirmPassword,
    sendForgotPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword,
};
