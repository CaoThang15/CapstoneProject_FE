import React, { useState } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { useBlocker } from "~/hooks";
import { UnchangeConfirmationDiaglog } from "./common";

interface Props<T extends FieldValues = FieldValues> extends React.PropsWithChildren {
    form: UseFormReturn<T>;
    direction?: "row" | "column";
    onSubmit?: (data: T) => void;
    submitOnEnter?: boolean;
}

const DynamicForm = <T extends FieldValues = FieldValues>({
    form,
    children,
    onSubmit,
    submitOnEnter = true,
}: Props<T>) => {
    const { handleSubmit, formState } = form;
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [pendingAction, setPendingAction] = useState<"submit" | "leave" | null>(null);
    const [pendingTx, setPendingTx] = useState<any>(null);

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (formState.isDirty) {
            setPendingAction("submit");
            setOpenConfirmDialog(true);
        } else if (onSubmit) {
            handleSubmit(onSubmit)();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (!submitOnEnter) return;

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();

            if (formState.isDirty) {
                setPendingAction("submit");
                setOpenConfirmDialog(true);
            } else if (onSubmit) {
                handleSubmit(onSubmit)();
            }
        }
    };

    // Intercept navigation
    useBlocker((tx) => {
        if (formState.isDirty) {
            setPendingAction("leave");
            setPendingTx(tx);
            setOpenConfirmDialog(true);
        } else {
            tx.retry();
        }
    }, formState.isDirty);

    const handleConfirmClose = () => {
        setOpenConfirmDialog(false);
        setPendingAction(null);
        setPendingTx(null);
    };

    const handleConfirmProceed = () => {
        setOpenConfirmDialog(false);
        if (pendingAction === "submit" && onSubmit) {
            handleSubmit(onSubmit)();
        } else if (pendingAction === "leave" && pendingTx) {
            pendingTx.retry();
        }
        setPendingAction(null);
        setPendingTx(null);
    };

    return (
        <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmitForm} onKeyDown={handleKeyDown}>
                {children}
            </form>
            <UnchangeConfirmationDiaglog
                handleClose={handleConfirmClose}
                handleProceed={handleConfirmProceed}
                open={openConfirmDialog}
            />
        </FormProvider>
    );
};

export default DynamicForm;
