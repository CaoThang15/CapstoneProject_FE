import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { BreadcrumbProvider } from "~/components/layout/breadcrumbs";
import { ManagerHeader } from "~/components/layout/header";
import { ManagerSidebar } from "~/components/layout/sidebar";

const ManagerWrapper: React.FC = () => {
    return (
        <BreadcrumbProvider>
            <Box className={`flex h-screen w-full flex-col`}>
                <ManagerHeader />

                <Box className="flex h-[calc(100%-64px)] w-full flex-1">
                    <Box className="h-full w-[15%] min-w-[250px] flex-shrink-0 border-r border-gray-300">
                        <ManagerSidebar />
                    </Box>

                    <Box className="h-full flex-1 overflow-hidden bg-[#f6fbfa] p-2">
                        <Box className="no-scrollbar h-full w-full overflow-y-auto">
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </BreadcrumbProvider>
    );
};

export default ManagerWrapper;
