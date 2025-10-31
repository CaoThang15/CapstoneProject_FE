import { DashboardOutlined, Inventory2Outlined, ManageHistoryOutlined } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const SELLER_PREFIX_ROUTE = "/seller";
export const sellerSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Dashboard",
        icon: <DashboardOutlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/dashboard`,
    },
    {
        labelKey: "My Products",
        icon: <Inventory2Outlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/products`,
    },
    {
        labelKey: "Order Management",
        icon: <ManageHistoryOutlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/orders`,
    },
];
