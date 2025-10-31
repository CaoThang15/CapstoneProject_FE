import React from "react";
import EnterRegisterCredentialStep from "./enter-register-credential.step";
import EnterRegisterOtpStep from "./enter-register-otp.step";
import { useRegisterStep, RegisterStepProvider } from "./register-step.context";

const StepRenderer: React.FC = () => {
    const { step } = useRegisterStep();

    switch (step) {
        case 0:
            return <EnterRegisterCredentialStep />;
        case 1:
            return <EnterRegisterOtpStep />;
    }
};

const RegisterPage: React.FC = () => {
    return (
        <RegisterStepProvider>
            <StepRenderer />
        </RegisterStepProvider>
    );
};

export default RegisterPage;
