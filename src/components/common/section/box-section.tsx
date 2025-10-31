import { Box, BoxProps } from "@mui/material";
import classNames from "classnames";
import React from "react";

const BoxSection: React.FC<BoxProps> = ({ children, className, ...props }) => {
    return (
        <Box className={classNames("rounded-xl border border-gray-100 bg-white p-4", className)} {...props}>
            {children}
        </Box>
    );
};

export default BoxSection;
