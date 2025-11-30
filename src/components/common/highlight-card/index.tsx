import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";
import React from "react";

interface HighlightCardProps extends ButtonProps {
    startIcon?: React.ReactNode;
    typography?: React.ReactNode;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ startIcon, typography, className, ...props }) => {
    return (
        <Button
            className={classNames("cursor-default justify-start rounded-xl border-none px-4 py-2", className)}
            // color="light"
            disableRipple
            sx={{ bgcolor: "primary.light", color: "white" }}
            startIcon={startIcon}
            {...props}
        >
            {typography}
        </Button>
    );
};

export default HighlightCard;
