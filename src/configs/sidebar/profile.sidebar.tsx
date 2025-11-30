import { AddBoxOutlined, DiscountOutlined, PersonOutline } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const profileSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Trang cá nhân",
        icon: <PersonOutline />,
        pathName: "/user/profile",
    },
    {
        labelKey: "Đơn hàng",
        icon: <AddBoxOutlined />,
        pathName: "/user/orders",
    },
    {
        labelKey: "Voucher của tôi",
        icon: <DiscountOutlined />,
        pathName: "/user/vouchers",
    },
];
