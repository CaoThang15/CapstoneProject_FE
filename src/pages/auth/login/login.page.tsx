import React from "react";
import { LoginStepProvider, useLoginStep } from "~/pages/auth/login/login-context";
import EnterLoginCredentialStep from "./enter-login-credential.step";
import EnterLoginOtpStep from "./enter-login-otp.step";

const StepRenderer: React.FC = () => {
    const { step } = useLoginStep();

    switch (step) {
        case 0:
            return <EnterLoginCredentialStep />;
        case 1:
            return <EnterLoginOtpStep />;
    }
};

const LoginPage: React.FC = () => {
    return (
        <LoginStepProvider>
            <StepRenderer />
        </LoginStepProvider>
    );
};

export default LoginPage;
