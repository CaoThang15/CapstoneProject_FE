export interface VerifyForgotPasswordOtpResponse {
    resetToken: string;
}

export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
}
