import { Box, Theme, Typography } from "@mui/material";
import React from "react";

interface HistogramBarProps {
    label: number;
    value: number;
}

const HistogramBar: React.FC<HistogramBarProps> = ({ label, value }) => (
    <Box className="flex items-center gap-2">
        <Typography className="w-4 text-sm">{label}</Typography>
        <Box className="h-1.5 w-full rounded bg-gray-200">
            <Box
                className="h-1.5 rounded"
                sx={{
                    backgroundColor: (theme: Theme) => theme.palette.success.main,
                    width: `${Math.max(0, Math.min(100, value))}%`,
                }}
            />
        </Box>
        <Typography className="w-10 text-right text-sm">{isNaN(value) ? "0" : value}%</Typography>
    </Box>
);

export default HistogramBar;
