import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
import AppLogo from "~/assets/images/logo.png";
import i18n from "~/configs/i18n";
import { sidebarTree } from "~/configs/sidebar";
import { useAuth } from "~/contexts/auth.context";
import { ChangeLanguageTab } from "./tabs/change-lang.tab";
import { SidebarTabItem, SidebarTabProps } from "./tabs/sidebar.tab";

const UserInfoSummary: React.FC = () => {
    const auth = useAuth();

    const fullName: string = auth?.user?.name ?? "N/A";

    const initials =
        fullName
            .split(" ")
            .filter(Boolean)
            .map((p: string) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    return (
        <Box className="mb-2 flex items-center rounded-xl bg-gray-100 px-3 py-2">
            <Avatar sx={{ width: 36, height: 36 }}>{initials}</Avatar>
            <Box className="ml-3 min-w-0">
                <Typography fontWeight={600} className="truncate">
                    {fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="truncate">
                    {`N/A`}
                </Typography>
            </Box>
        </Box>
    );
};

export const AdminSidebar: React.FC = () => {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
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

        return filterTree(sidebarTree);
    }, [auth]);

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: "15%",
                minWidth: "250px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "15%",
                    minWidth: "250px",
                    boxSizing: "border-box",
                    pt: 2,
                },
            }}
        >
            <Stack direction="column" spacing={1.5} sx={{ minHeight: "100%" }}>
                <Box className="flex items-center px-6 py-2">
                    <Avatar src={AppLogo}>S</Avatar>
                    <Typography className="ml-3 truncate text-[16px] font-bold">SMarket</Typography>
                </Box>

                <Box className="no-scrollbar mx-6 w-full flex-1 overflow-y-auto overflow-x-hidden pb-4 pt-2">
                    {filteredSidebarTree.map((sideBar, idx) => (
                        <SidebarTabItem key={sideBar.labelKey + idx} {...sideBar} level={0} />
                    ))}
                </Box>

                <Stack direction={"column"} sx={{ flexShrink: 0 }} className="border-t border-gray-300 p-2">
                    <UserInfoSummary />
                    <ChangeLanguageTab />
                    <SidebarTabItem
                        icon={<ExitToApp />}
                        labelKey={i18n.translationKey.signOut}
                        onClick={handleLogout}
                    />
                </Stack>
            </Stack>
        </Drawer>
    );
};
