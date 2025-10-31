import { Close, ExitToApp, MenuOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router";
import i18n from "~/configs/i18n";
import { adminSidebarTree } from "~/configs/sidebar/admin.sidebar";
import { sellerSidebarTree } from "~/configs/sidebar/seller.sidebar";
import { Role } from "~/constants/roles";
import { useAuth } from "~/contexts/auth.context";
import { useBreadcrumb } from "../breadcrumbs";
import { SidebarTabItem, SidebarTabProps } from "./tabs/sidebar.tab";
import { DEFAULT_FIRST_BREADCRUMB_MANAGER } from "~/configs/breadcrumbs.config";

const UserInfoSummary: React.FC = () => {
    const { user } = useAuth();

    const fullName: string = user?.name ?? "N/A";

    const initials =
        fullName
            .split(" ")
            .filter(Boolean)
            .map((p: string) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    const role = user?.roleId === Role.Admin ? "Administrator" : "Seller";

    return (
        <Box className="mb-2 flex items-center py-2">
            <Avatar sx={{ width: 36, height: 36 }}>{initials}</Avatar>
            <Box className="ml-3 min-w-0">
                <Typography fontWeight={600} className="truncate">
                    {fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="truncate">
                    {role}
                </Typography>
            </Box>
        </Box>
    );
};

export const ManagerSidebar: React.FC = () => {
    const { logout, user } = useAuth();
    const { pathname } = useLocation();
    const { setBreadcrumbs } = useBreadcrumb();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
    };

    const filteredSidebarTree = React.useMemo(() => {
        const filterTree = (items: SidebarTabProps[]): SidebarTabProps[] =>
            items
                .filter(() => {
                    return true;
                })
                .map((item) => ({
                    ...item,
                    children: item.children ? filterTree(item.children) : undefined,
                }));

        return filterTree(user?.roleId == Role.Seller ? sellerSidebarTree : adminSidebarTree);
    }, [user]);

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
        const foundPath = findBreadcrumbPath(filteredSidebarTree, pathname);

        if (foundPath && foundPath.length > 0) {
            setBreadcrumbs([
                DEFAULT_FIRST_BREADCRUMB_MANAGER,
                ...foundPath.map((item) => ({
                    label: item.labelKey,
                    path: item.pathName,
                })),
            ]);
        } else {
            setBreadcrumbs([DEFAULT_FIRST_BREADCRUMB_MANAGER]);
        }
    }, [pathname, filteredSidebarTree, findBreadcrumbPath, setBreadcrumbs]);

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
                    `flex h-full transform flex-col border-r border-gray-300 bg-gray-50 p-4 transition-transform duration-300 md:relative md:flex md:translate-x-0`,
                    { "translate-x-0": isOpen, "-translate-x-full": !isOpen },
                )}
            >
                <Box className="mb-2 flex justify-end md:hidden">
                    <IconButton onClick={() => setIsOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>

                <Stack className="no-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden">
                    {filteredSidebarTree.map((sideBar, idx) => (
                        <SidebarTabItem key={sideBar.labelKey + idx} {...sideBar} level={0} />
                    ))}
                </Stack>

                <Stack className="mt-4 flex-shrink-0 border-t border-gray-300 pt-2">
                    <UserInfoSummary />
                    <SidebarTabItem
                        icon={<ExitToApp />}
                        labelKey={i18n.translationKey.signOut}
                        onClick={handleLogout}
                    />
                </Stack>
            </Box>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <Box className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden" onClick={() => setIsOpen(false)} />
            )}
        </>
    );
};
