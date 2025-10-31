import React from "react";
import { ForgotPasswordProvider, useForgotPassword } from "~/contexts/forgot-password.context";
import EnterEmailStep from "./enter-email.step";
import EnterOTPCodeStep from "./enter-otp-code.step";
import EnterNewPasswordStep from "./enter-new-password.step";
import ForgotPasswordSuccessStep from "./forgot-password-success.step";

const StepRenderer: React.FC = () => {
    const { step } = useForgotPassword();

    switch (step) {
        case 0:
            return <EnterEmailStep />;
        case 1:
            return <EnterOTPCodeStep />;
        case 2:
            return <EnterNewPasswordStep />;
        case 3:
            return <ForgotPasswordSuccessStep />;
    }
};

const ForgotPasswordPage: React.FC = () => {
    return (
        <ForgotPasswordProvider>
            <StepRenderer />
        </ForgotPasswordProvider>
    );
};

export default ForgotPasswordPage;
