import { DashboardOutlined } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const sellerSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Dashboard",
        icon: <DashboardOutlined />,
        pathName: "/seller/dashboard",
    },
];
