import { DashboardOutlined, Inventory2Outlined, ManageHistoryOutlined } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const SELLER_PREFIX_ROUTE = "/seller";
export const sellerSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Bảng điều khiển",
        icon: <DashboardOutlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/dashboard`,
    },
    {
        labelKey: "Sản phẩm của tôi",
        icon: <Inventory2Outlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/products`,
    },
    {
        labelKey: "Quản lý đơn hàng",
        icon: <ManageHistoryOutlined />,
        pathName: `${SELLER_PREFIX_ROUTE}/orders`,
    },
];
