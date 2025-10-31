import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useForgotPassword } from "~/contexts/forgot-password.context";

const steps = ["Nhập email", "Nhập mã xác nhận", "Đặt lại mật khẩu", "Hoàn tất"];

export const ForgotPasswordStepper: React.FC = () => {
    const { step } = useForgotPassword();

    return (
        <Stepper activeStep={step} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};
