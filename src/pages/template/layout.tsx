import { Box } from "@mui/material";
import React from "react";
import { LandingSidebar } from "~/components/layout/sidebar";

const TemplateLayout: React.FC = () => {
    return (
        // <Container maxWidth="lg">
        <Box display={"flex"} flexDirection={"column"} minHeight="100vh" className="">
            <LandingSidebar />
        </Box>
        // </Container>
    );
};

export default TemplateLayout;
