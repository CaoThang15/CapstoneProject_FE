import React from "react";

interface ForgotPasswordContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPasswordContext = React.createContext<ForgotPasswordContextType | undefined>(undefined);

export const ForgotPasswordProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [step, setStep] = React.useState(0);
    const [email, setEmail] = React.useState("");

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(0, s - 1));
    const goToStep = (s: number) => setStep(s);

    return (
        <ForgotPasswordContext.Provider value={{ step, nextStep, prevStep, goToStep, email, setEmail }}>
            {children}
        </ForgotPasswordContext.Provider>
    );
};

export const useForgotPassword = () => {
    const ctx = React.useContext(ForgotPasswordContext);
    if (!ctx) throw new Error("useForgotPassword must be used inside ForgotPasswordProvider");
    return ctx;
};
