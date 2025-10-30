import { AppBar } from "@mui/material";
import React from "react";

const LandingFooter: React.FC = () => {
    return (
        <AppBar
            position="static"
            sx={{
                bottom: 0,
                top: "auto",
            }}
            className="shadow-m w-full justify-center rounded-xl bg-white px-3 py-2 text-center"
        >
            © 2025 S-Market. All rights reserved.
        </AppBar>
    );
};

export default LandingFooter;
