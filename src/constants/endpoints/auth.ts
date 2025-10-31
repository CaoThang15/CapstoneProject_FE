const authEndpointPrefix = "/auth";

export const authEndpoints = {
    login: `${authEndpointPrefix}/login`,
    logout: `${authEndpointPrefix}/logout`,
    register: `${authEndpointPrefix}/register`,
    currentUser: `/users/profile`,
    refreshToken: `${authEndpointPrefix}/login/refresh-token`,
    userPermission: `${authEndpointPrefix}/current-user/policies`,
    resetPassword: `${authEndpointPrefix}/reset-password`,
    confirmPassword: `${authEndpointPrefix}/confirm-password`,
    verifyLoginOtp: `${authEndpointPrefix}/verify-login-otp`,
    verifyRegisterOtp: `${authEndpointPrefix}/verify-register-otp`,
    forgotPassword: `${authEndpointPrefix}/forgot-password`,
    verifyForgotPasswordOtp: `${authEndpointPrefix}/verify-forgot-password-otp`,
};
