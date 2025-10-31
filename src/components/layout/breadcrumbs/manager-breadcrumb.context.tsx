import { Recycling } from "@mui/icons-material";
import React from "react";
import { IBreadcrumbItem } from "~/configs/breadcrumbs.config";

interface BreadcrumbContextProps {
    breadcrumbs: IBreadcrumbItem[];
    setBreadcrumbs: (items: IBreadcrumbItem[]) => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = React.useState<IBreadcrumbItem[]>([
        { label: "SMarket", path: "/seller", icon: <Recycling /> },
    ]);

    return <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>{children}</BreadcrumbContext.Provider>;
};

export const useManagerBreadcrumb = () => {
    const context = React.useContext(BreadcrumbContext);
    if (!context) throw new Error("useManagerBreadcrumb must be used within BreadcrumbProvider");
    return context;
};
