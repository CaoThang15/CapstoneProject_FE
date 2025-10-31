import { Close, MenuOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router";
import { DEFAULT_FIRST_BREADCRUMB_PROFILE } from "~/configs/breadcrumbs.config";
import { profileSidebarTree } from "~/configs/sidebar/profile.sidebar";
import { useBreadcrumb } from "../breadcrumbs";
import { SidebarTabItem, SidebarTabProps } from "./tabs/sidebar.tab";

export const ProfileSidebar: React.FC = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const { setBreadcrumbs } = useBreadcrumb();

    const findBreadcrumbPath = React.useCallback(
        (items: SidebarTabProps[], targetPath: string, parents: SidebarTabProps[] = []): SidebarTabProps[] | null => {
            for (const item of items) {
                const currentPath = [...parents, item];
                if (item.pathName === targetPath) {
                    return currentPath;
                }
                if (item.children) {
                    const found = findBreadcrumbPath(item.children, targetPath, currentPath);
                    if (found) return found;
                }
            }
            return null;
        },
        [],
    );

    React.useEffect(() => {
        const foundPath = findBreadcrumbPath(profileSidebarTree, pathname);

        if (foundPath && foundPath.length > 0) {
            setBreadcrumbs([
                DEFAULT_FIRST_BREADCRUMB_PROFILE,
                ...foundPath.map((item) => ({
                    label: item.labelKey,
                    path: item.pathName,
                })),
            ]);
        } else {
            setBreadcrumbs([DEFAULT_FIRST_BREADCRUMB_PROFILE]);
        }
    }, [pathname, findBreadcrumbPath, setBreadcrumbs]);

    return (
        <>
            <IconButton
                className="fixed left-4 top-4 z-50 bg-white p-1 shadow md:hidden"
                onClick={() => setIsOpen(true)}
            >
                <MenuOutlined />
            </IconButton>

            <Box
                className={classNames(
                    `flex h-full transform flex-col rounded-lg bg-white p-4 transition-transform duration-300 md:relative md:flex md:translate-x-0`,
                    { "translate-x-0": isOpen, "-translate-x-full": !isOpen },
                )}
            >
                <Box className="mb-2 flex justify-end md:hidden">
                    <IconButton onClick={() => setIsOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>

                <Stack className="no-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden">
                    {profileSidebarTree.map((sideBar, idx) => (
                        <SidebarTabItem key={sideBar.labelKey + idx} {...sideBar} level={0} />
                    ))}
                </Stack>
            </Box>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <Box className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden" onClick={() => setIsOpen(false)} />
            )}
        </>
    );
};
