import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Spinner: React.FC = () => {
    return (
        <Box className="container flex items-center justify-center">
            <CircularProgress className="w-50 h-50" />
        </Box>
    );
};
