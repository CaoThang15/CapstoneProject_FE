import { Box, TextField } from "@mui/material";
import React from "react";
import { ControllerWrapper, FormLabel } from "../common";
import { BaseFormItemProps } from "../types/form-item";

export type OtpFormItemProps = BaseFormItemProps & {
    codeLength?: number; // number of OTP digits
    size?: "small" | "medium";
};

const OtpInputRenderer: React.FC<{
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    codeLength: number;
    size: "small" | "medium";
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    error?: string;
}> = ({ label, placeholder, required, disabled, codeLength, size, value, onChange, onBlur, error }) => {
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
    const [digits, setDigits] = React.useState<string[]>(Array.from({ length: codeLength }, (_, i) => value[i] ?? ""));

    React.useEffect(() => {
        setDigits(Array.from({ length: codeLength }, (_, i) => value[i] ?? ""));
    }, [value, codeLength]);

    const focusAt = (idx: number) => {
        inputsRef.current[idx]?.focus();
        inputsRef.current[idx]?.select();
    };

    const commit = (nextDigits: string[]) => {
        setDigits(nextDigits);
        onChange(nextDigits.join(""));
    };

    const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const raw = e.target.value;
        const nextChar = raw.slice(-1).replace(/\D/g, "");
        const next = [...digits];
        next[idx] = nextChar || "";
        commit(next);

        if (nextChar && idx < codeLength - 1) {
            focusAt(idx + 1);
        }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Backspace") {
            if (digits[idx]) {
                const next = [...digits];
                next[idx] = "";
                commit(next);
            } else if (idx > 0) {
                focusAt(idx - 1);
            }
        }

        if (e.key === "ArrowLeft" && idx > 0) {
            e.preventDefault();
            focusAt(idx - 1);
        }
        if (e.key === "ArrowRight" && idx < codeLength - 1) {
            e.preventDefault();
            focusAt(idx + 1);
        }
    };

    const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pasted) return;

        const next = [...digits];
        for (let i = 0; i < codeLength - idx && i < pasted.length; i++) {
            next[idx + i] = pasted[i];
        }
        commit(next);
        const lastIndex = Math.min(idx + pasted.length, codeLength - 1);
        focusAt(lastIndex);
    };

    return (
        <Box className="w-full">
            <FormLabel label={label || placeholder} required={required} />
            <Box className="flex w-full justify-center gap-2">
                {Array.from({ length: codeLength }).map((_, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <TextField
                            inputRef={(el) => (inputsRef.current[idx] = el)}
                            value={digits[idx]}
                            onChange={(e) => handleChange(idx, e)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            onPaste={(e) => handlePaste(idx, e)}
                            onBlur={onBlur}
                            disabled={disabled}
                            error={!!error}
                            autoComplete="off"
                            type="password"
                            size={size}
                            slotProps={{
                                input: {
                                    className: "!rounded-xl",
                                    style: {
                                        textAlign: "center",
                                        fontSize: 18,
                                        width: size === "small" ? 60 : 75,
                                        height: size === "small" ? 60 : 75,
                                        padding: 0,
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiInputBase-input": {
                                    textAlign: "center",
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export const OtpFormItem: React.FC<OtpFormItemProps> = ({
    name,
    label = "",
    placeholder = "",
    defaultValue = "",
    disabled = false,
    codeLength = 6,
    size = "small",
    required = false,
}) => {
    const onlyDigitsRegex = React.useMemo(() => new RegExp(`^\\d{${codeLength}}$`), [codeLength]);

    return (
        <ControllerWrapper
            name={name}
            required={required}
            minLength={codeLength}
            maxLength={codeLength}
            pattern={onlyDigitsRegex}
            defaultValue={defaultValue}
            render={({ field, error }) => {
                return (
                    <OtpInputRenderer
                        label={label}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        codeLength={codeLength}
                        size={size}
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={error}
                    />
                );
            }}
        />
    );
};

export default OtpFormItem;
