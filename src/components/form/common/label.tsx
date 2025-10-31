import { FormLabelProps as FormLabelMUIProps, FormLabel as FormLabelMUI, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";

interface FormLabelProps extends FormLabelMUIProps {
    required?: boolean;
    label?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ required = false, label = "", ...props }) => {
    if (!label) {
        return null;
    }

    return (
        <FormLabelMUI {...props}>
            <Typography variant="body1" component="span" className={classNames("text-sm text-gray-500")}>
                {label}
            </Typography>
            {required && <span style={{ color: "red" }}> *</span>}
        </FormLabelMUI>
    );
};

export default FormLabel;
