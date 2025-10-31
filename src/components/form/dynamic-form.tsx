import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

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
    const { handleSubmit } = form;

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

    return (
        <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmitForm} onKeyDown={handleKeyDown}>
                {children}
            </form>
        </FormProvider>
    );
};

export default DynamicForm;
