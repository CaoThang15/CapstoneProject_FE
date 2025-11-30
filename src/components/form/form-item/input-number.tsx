import { Box, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { ControllerWrapper } from "../common";
import FormErrorMessage from "../common/error";
import { BaseFormItemProps } from "../types/form-item";
import { TValidationMaxNumber, TValidationMinNumber } from "../types/validation";

type InputNumberUIProps = TextFieldProps & {
    defaultValue?: number;
};

type InputNumberValidationRules = TValidationMaxNumber & TValidationMinNumber;

export type InputNumberFormItemProps = Omit<BaseFormItemProps, "defaultValue"> &
    InputNumberUIProps &
    InputNumberValidationRules;

const formatNumber = (value: number | string) => {
    if (value === "" || value === null || value === undefined) return "";
    const num = Number(String(value).replace(/\D/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString("de-DE"); // → 1.234.567
};
export const InputNumberFormItem: React.FC<InputNumberFormItemProps> = ({
    name,
    defaultValue,
    disabled,
    placeholder,
    label = "",
    fullWidth = true,
    required = false,
    maxNumber = undefined,
    minNumber = 0,
    size = "small",
    ...props
}) => {
    return (
        <ControllerWrapper
            name={name}
            required={required}
            maxNumber={maxNumber}
            minNumber={minNumber}
            defaultValue={defaultValue ?? ""}
            render={({ field, error }) => (
                <Box className="w-full">
                    <TextField
                        {...field}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        value={formatNumber(field.value)}
                        onChange={(e) => {
                            const raw = e.target.value.replace(/\./g, "").replace(/\D/g, "");
                            field.onChange(raw ? Number(raw) : "");
                        }}
                        type="text"
                        size={size}
                        error={!!error}
                        required={required}
                        sx={{
                            marginTop: 0,
                        }}
                        slotProps={{ inputLabel: { shrink: true } }}
                        variant="outlined"
                        disabled={disabled}
                        margin="normal"
                        label={""}
                        {...props}
                    />
                    <FormErrorMessage errorMessage={error} label={label} />
                </Box>
            )}
        />
    );
};
