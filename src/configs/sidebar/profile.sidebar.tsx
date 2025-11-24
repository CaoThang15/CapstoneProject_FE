import { AddBoxOutlined, DiscountOutlined, PersonOutline } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const profileSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Profile",
        icon: <PersonOutline />,
        pathName: "/user/profile",
    },
    {
        labelKey: "Orders",
        icon: <AddBoxOutlined />,
        pathName: "/user/orders",
    },
    {
        labelKey: "Voucher",
        icon: <DiscountOutlined />,
        pathName: "/user/vouchers",
    },
];
