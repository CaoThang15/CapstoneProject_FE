import React, { createContext, useContext, useState } from "react";
import { Voucher } from "~/entities";

export type CheckoutStep = "delivery" | "payment" | "review";

interface CheckoutContextType {
    voucher?: Voucher;
    setVoucher?: (voucher: Voucher | undefined) => void;

    finishedSteps: CheckoutStep[];
    step: CheckoutStep;
    setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
    nextStep: () => void;
    prevStep: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [finishedSteps, setFinishedSteps] = useState<CheckoutStep[]>([]);
    const [voucher, setVoucher] = useState<Voucher | undefined>(undefined);
    const [step, setStep] = useState<CheckoutStep>("delivery");

    const nextStep = () => {
        setStep((prev) => {
            setFinishedSteps((steps) => (steps.includes(prev) ? steps : [...steps, prev]));
            return prev === "delivery" ? "payment" : prev === "payment" ? "review" : "review";
        });
    };

    const prevStep = () => {
        setFinishedSteps((steps) => (steps.includes(step) ? steps : [...steps, step]));
        setStep((prev) => (prev === "review" ? "payment" : prev === "payment" ? "delivery" : "delivery"));
    };

    return (
        <CheckoutContext.Provider value={{ voucher, setVoucher, step, setStep, nextStep, prevStep, finishedSteps }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
    return ctx;
};
