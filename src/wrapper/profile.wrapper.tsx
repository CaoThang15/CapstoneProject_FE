import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { BreadcrumbProvider } from "~/components/layout/breadcrumbs";
import AuthenticatedBreadcrumbs from "~/components/layout/breadcrumbs/breadcrumb";
import { LandingHeader } from "~/components/layout/header";
import { ProfileSidebar } from "~/components/layout/sidebar";

const ProfileWrapper: React.FC = () => {
    return (
        <BreadcrumbProvider>
            <Box className={`flex min-h-screen w-full flex-col`}>
                <LandingHeader />

                <main className="container mx-auto my-3 flex h-[calc(100%-64px)] w-full flex-1 flex-grow space-x-3 pt-20">
                    <Box className="h-full w-[15%] min-w-[250px] flex-shrink-0 border border-gray-100">
                        <ProfileSidebar />
                    </Box>

                    <Box className="h-full flex-1 overflow-hidden">
                        <Box className="mb-3 bg-white px-6 py-4">
                            <AuthenticatedBreadcrumbs />
                        </Box>
                        <Box className="h-full w-full overflow-y-auto">
                            <Outlet />
                        </Box>
                    </Box>
                </main>
            </Box>
        </BreadcrumbProvider>
    );
};

export default ProfileWrapper;
