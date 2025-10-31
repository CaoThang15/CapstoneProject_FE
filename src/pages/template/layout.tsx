import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { BreadcrumbProvider } from "~/components/layout/breadcrumbs/manager-breadcrumb.context";
import { ManagerHeader } from "~/components/layout/header";
import { ManagerSidebar } from "~/components/layout/sidebar";

const TemplateLayout: React.FC = () => {
    return (
        <BreadcrumbProvider>
            <Box className={`flex min-h-screen w-full flex-col`}>
                <ManagerHeader />

                <Box className="flex w-full flex-1">
                    <Box className="w-[15%]">
                        <ManagerSidebar />
                    </Box>

                    <Box className="flex-1 overflow-auto p-4">
                        <Outlet />
                    </Box>
                </Box>
                {/* <main className="container mx-auto my-3 flex-grow">
                    <ManagerSidebar />
                    <Outlet />
                </main> */}
            </Box>
        </BreadcrumbProvider>
    );
};

export default TemplateLayout;
