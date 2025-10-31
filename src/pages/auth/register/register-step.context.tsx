import React from "react";

interface RegisterStepContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterStepContext = React.createContext<RegisterStepContextType | undefined>(undefined);

export const RegisterStepProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [step, setStep] = React.useState(0);
    const [email, setEmail] = React.useState("");

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(0, s - 1));
    const goToStep = (s: number) => setStep(s);

    return (
        <RegisterStepContext.Provider value={{ step, nextStep, prevStep, goToStep, email, setEmail }}>
            {children}
        </RegisterStepContext.Provider>
    );
};

export const useRegisterStep = () => {
    const ctx = React.useContext(RegisterStepContext);
    if (!ctx) throw new Error("useRegisterStep must be used inside RegisterStepProvider");
    return ctx;
};
