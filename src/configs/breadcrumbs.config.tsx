import { Category, Home, Person, PersonOutline, Recycling } from "@mui/icons-material";
import { ReactNode } from "react";

export interface IBreadcrumbItem {
    label: string;
    path?: string;
    icon?: ReactNode;
}

export const DEFAULT_FIRST_BREADCRUMB_MANAGER: IBreadcrumbItem = {
    label: "SMarket",
    path: "/",
    icon: <Recycling />,
};

export const DEFAULT_FIRST_BREADCRUMB_PROFILE = {
    label: "Trang cá nhân",
    icon: <PersonOutline />,
};

// Mapping of known paths → labels & icons
const breadcrumbMapping: Record<string, IBreadcrumbItem> = {
    "": { label: "Home", icon: <Home fontSize="small" />, path: "/" },
    category: { label: "Categories", icon: <Category fontSize="small" />, path: "/category" },
    profile: { label: "Profile", icon: <Person fontSize="small" />, path: "/profile" },
};

export const getBreadcrumbItems = (pathname: string): IBreadcrumbItem[] => {
    const parts = pathname.split("/").filter(Boolean);
    const breadcrumbs: IBreadcrumbItem[] = [];

    let currentPath = "";
    for (let i = 0; i < parts.length; i++) {
        currentPath += `/${parts[i]}`;
        const key = parts[i];

        // Try to use mapping, else fallback to capitalized segment
        const mapped = breadcrumbMapping[key] || {
            label: key.toCase("pascal"),
        };

        breadcrumbs.push({
            ...mapped,
            path: i === parts.length - 1 ? undefined : currentPath, // last item not clickable
        });
    }

    // Special case: root `/` → show Home
    if (breadcrumbs.length === 0) {
        breadcrumbs.push({
            ...breadcrumbMapping[""],
            path: "/",
        });
    }

    // Special case: `/category` → add "All"
    if (parts[0] === "category" && breadcrumbs.length === 1) {
        breadcrumbs.push({ label: "All" });
    }

    return breadcrumbs;
};
