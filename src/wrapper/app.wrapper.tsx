import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { LandingFooter } from "~/components/layout/footer";
import { LandingHeader } from "~/components/layout/header";

const AppWrapper: React.FC = () => {
    return (
        // <Box className="flex h-full">
        <Box className={`flex min-h-screen w-full flex-col`}>
            <LandingHeader />
            <main className="container mx-auto my-3 flex-grow">
                <Outlet />
            </main>
            <LandingFooter />
        </Box>
        // </Box>
    );
};

export default AppWrapper;
