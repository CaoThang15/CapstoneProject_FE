import { Box, Rating, RatingProps } from "@mui/material";
import React from "react";
import { ControllerWrapper, FormErrorMessage } from "../common";
import { BaseFormItemProps } from "../types/form-item";

export type RatingFormItemProps = BaseFormItemProps & RatingProps;

export const RatingFormItem: React.FC<RatingFormItemProps> = ({
    name,
    defaultValue = 0,
    required = false,
    max = 5,
    precision = 1,
    readOnly = false,
}) => {
    return (
        <ControllerWrapper
            name={name}
            required={required}
            defaultValue={defaultValue}
            render={({ field, error }) => (
                <Box className="flex w-full flex-col gap-1">
                    <Rating
                        {...field}
                        value={field.value ?? 1}
                        onChange={(_, newValue) => field.onChange(newValue ?? 1)}
                        max={max}
                        precision={precision}
                        readOnly={readOnly}
                    />

                    <FormErrorMessage errorMessage={error} />
                </Box>
            )}
        />
    );
};
