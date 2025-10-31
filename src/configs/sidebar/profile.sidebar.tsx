import { AddBoxOutlined, PersonOutline } from "@mui/icons-material";
import { SidebarTabProps } from "~/components/layout/sidebar/tabs/sidebar.tab";

export const profileSidebarTree: SidebarTabProps[] = [
    {
        labelKey: "Profile",
        icon: <PersonOutline />,
        pathName: "/profile",
    },
    {
        labelKey: "Orders",
        icon: <AddBoxOutlined />,
        pathName: "/orders",
    },
];
