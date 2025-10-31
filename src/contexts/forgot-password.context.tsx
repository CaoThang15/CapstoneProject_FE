import React from "react";

interface ForgotPasswordContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    resetToken?: string;
    setResetToken?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ForgotPasswordContext = React.createContext<ForgotPasswordContextType | undefined>(undefined);

export const ForgotPasswordProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [step, setStep] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [resetToken, setResetToken] = React.useState<string | undefined>(undefined);
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(0, s - 1));
    const goToStep = (s: number) => setStep(s);

    return (
        <ForgotPasswordContext.Provider
            value={{ step, nextStep, prevStep, goToStep, email, setEmail, resetToken, setResetToken }}
        >
            {children}
        </ForgotPasswordContext.Provider>
    );
};

export const useForgotPassword = () => {
    const ctx = React.useContext(ForgotPasswordContext);
    if (!ctx) throw new Error("useForgotPassword must be used inside ForgotPasswordProvider");
    return ctx;
};
