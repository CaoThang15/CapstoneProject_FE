import React, { useContext } from "react";
import { Voucher } from "~/entities";

export type CheckoutStep = "delivery" | "payment" | "review";

interface CheckoutContextType {
    voucher: Voucher | null;
    setVoucher: (voucher: Voucher | null) => void;
    clearVoucher: () => void;

    finishedSteps: CheckoutStep[];
    step: CheckoutStep;
    setStep: React.Dispatch<React.SetStateAction<CheckoutStep>>;
    nextStep: () => void;
    prevStep: () => void;
}

const CheckoutContext = React.createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [finishedSteps, setFinishedSteps] = React.useState<CheckoutStep[]>([]);
    const [step, setStep] = React.useState<CheckoutStep>("delivery");

    // Initialize voucher from sessionStorage to persist across page navigation
    const [voucher, setVoucherState] = React.useState<Voucher | null>(() => {
        try {
            const saved = sessionStorage.getItem("checkout-voucher");
            if (saved) {
                const parsed = JSON.parse(saved);
                // Reconstruct the Voucher instance if it has methods
                return Voucher.fromJson(parsed);
            }
        } catch (error) {
            console.error("Error loading voucher from storage:", error);
        }
        return null;
    });

    const setVoucher = (newVoucher: Voucher | null) => {
        setVoucherState(newVoucher);
    };

    const clearVoucher = () => {
        setVoucherState(null);
        sessionStorage.removeItem("checkout-voucher");
    };

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

    // Persist voucher to sessionStorage whenever it changes
    React.useEffect(() => {
        try {
            if (voucher) {
                sessionStorage.setItem("checkout-voucher", JSON.stringify(voucher));
            } else {
                sessionStorage.removeItem("checkout-voucher");
            }
        } catch (error) {
            console.error("Error saving voucher to storage:", error);
        }
    }, [voucher]);

    return (
        <CheckoutContext.Provider
            value={{ voucher, setVoucher, clearVoucher, step, setStep, nextStep, prevStep, finishedSteps }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => {
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
    return ctx;
};
