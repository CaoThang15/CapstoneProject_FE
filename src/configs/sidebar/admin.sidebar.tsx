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
        labelKey: "Bảng điều khiển",
        icon: <DashboardOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/dashboard`,
    },
    {
        labelKey: "Quản lý danh mục",
        icon: <CategoryOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/categories`,
    },
    {
        labelKey: "Quản lý người dùng",
        icon: <Person />,
        pathName: `${ADMIN_PREFIX_ROUTE}/users`,
    },
    {
        labelKey: "Quản lý sản phẩm",
        icon: <Inventory2Outlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/products`,
    },
    {
        labelKey: "Quản lý đơn hàng",
        icon: <ShoppingCartCheckoutOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/orders`,
    },
    {
        labelKey: "Quản lý voucher",
        icon: <DiscountOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/vouchers`,
    },
    {
        labelKey: "Phê duyệt người bán",
        icon: <DiscountOutlined />,
        pathName: `${ADMIN_PREFIX_ROUTE}/seller-approval`,
    },
];
