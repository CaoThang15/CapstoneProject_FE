import { IconButton, Stack } from "@mui/material";
import React from "react";

interface HighlightCardProps {
    startIcon?: React.ReactNode;
    typography?: React.ReactNode;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ startIcon, typography }) => {
    return (
        <IconButton
            className="cursor-default rounded-xl"
            // color="light"
            disableRipple
            sx={{ bgcolor: "primary.light", color: "primary.main" }}
        >
            <Stack direction="row" spacing={1} alignItems="center" className="me-2">
                {startIcon}
                {typography}
            </Stack>
        </IconButton>
    );
};

export default HighlightCard;
