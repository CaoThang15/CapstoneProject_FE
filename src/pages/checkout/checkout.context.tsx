import React, { createContext, useContext, useState } from "react";

export type CheckoutStep = "delivery" | "payment" | "review";

interface CheckoutContextType {
    step: CheckoutStep;
    setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
    nextStep: () => void;
    prevStep: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [step, setStep] = useState<CheckoutStep>("delivery");

    const nextStep = () => {
        setStep((prev) => (prev === "delivery" ? "payment" : prev === "payment" ? "review" : "review"));
    };

    const prevStep = () => {
        setStep((prev) => (prev === "review" ? "payment" : prev === "payment" ? "delivery" : "delivery"));
    };

    return (
        <CheckoutContext.Provider value={{ step, setStep, nextStep, prevStep }}>{children}</CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
    return ctx;
};
