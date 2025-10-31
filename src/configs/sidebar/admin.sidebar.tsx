import { CategoryOutlined, DashboardOutlined } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const ADMIN_PREFIX_ROUTE = "/admin";
export const adminSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Dashboard",
        icon: <DashboardOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/dashboard`,
    },
    {
        labelKey: "Category",
        icon: <CategoryOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/car`,
    },
];
