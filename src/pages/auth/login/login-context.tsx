import React from "react";

interface LoginStepContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LoginStepContext = React.createContext<LoginStepContextType | undefined>(undefined);

export const LoginStepProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [step, setStep] = React.useState(0);
    const [email, setEmail] = React.useState("");

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(0, s - 1));
    const goToStep = (s: number) => setStep(s);

    return (
        <LoginStepContext.Provider value={{ step, nextStep, prevStep, goToStep, email, setEmail }}>
            {children}
        </LoginStepContext.Provider>
    );
};

export const useLoginStep = () => {
    const ctx = React.useContext(LoginStepContext);
    if (!ctx) throw new Error("useLoginStep must be used inside LoginStepProvider");
    return ctx;
};
