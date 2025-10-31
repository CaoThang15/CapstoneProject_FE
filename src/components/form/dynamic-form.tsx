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
    // const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    // const [pendingTx, setPendingTx] = useState<any>(null);

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (onSubmit) {
            handleSubmit(onSubmit)();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (!submitOnEnter) return;

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();

            if (onSubmit) {
                handleSubmit(onSubmit)();
            }
        }
    };

    // Intercept navigation
    // useBlocker((tx) => {
    //     if (formState.isDirty) {
    //         setPendingTx(tx);
    //         setOpenConfirmDialog(true);
    //     } else {
    //         tx.retry();
    //     }
    // }, formState.isDirty);

    React.useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (formState.isDirty) {
                event.preventDefault();
                event.returnValue = ""; // Modern browsers require this to show the confirmation dialog
                // setOpenConfirmDialog(true);
                return "";
            }
        };

        if (formState.isDirty) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [formState.isDirty]);

    // const handleConfirmClose = () => {
    //     setOpenConfirmDialog(false);
    //     setPendingTx(null);
    // };

    // const handleConfirmProceed = () => {
    //     setOpenConfirmDialog(false);
    //     if (pendingTx) {
    //         pendingTx.retry();
    //     }
    //     setPendingTx(null);
    // };

    return (
        <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmitForm} onKeyDown={handleKeyDown}>
                {children}
            </form>
            {/* <UnchangeConfirmationDiaglog
                handleClose={handleConfirmClose}
                handleProceed={handleConfirmProceed}
                open={openConfirmDialog}
            /> */}
        </FormProvider>
    );
};

export default DynamicForm;
