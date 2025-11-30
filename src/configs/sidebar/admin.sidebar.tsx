import {
    CategoryOutlined,
    DashboardOutlined,
    DiscountOutlined,
    Inventory2Outlined,
    Person,
    ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const ADMIN_PREFIX_ROUTE = "/admin";
export const adminSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Dashboard",
        icon: <DashboardOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/dashboard`,
    },
    {
        labelKey: "Category Management",
        icon: <CategoryOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/categories`,
    },
    {
        labelKey: "User Management",
        icon: <Person />,
        pathName: `${ADMIN_PREFIX_ROUTE}/users`,
    },
    {
        labelKey: "Product Management",
        icon: <Inventory2Outlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/products`,
    },
    {
        labelKey: "Order Management",
        icon: <ShoppingCartCheckoutOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/orders`,
    },
    {
        labelKey: "Voucher Management",
        icon: <DiscountOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/vouchers`,
    },
    {
        labelKey: "Seller Approval",
        icon: <DiscountOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/seller-approval`,
    },
];
