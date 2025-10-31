import React from "react";
import { IBreadcrumbItem } from "~/configs/breadcrumbs.config";

interface BreadcrumbContextProps {
    breadcrumbs: IBreadcrumbItem[];
    setBreadcrumbs: (items: IBreadcrumbItem[]) => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = React.useState<IBreadcrumbItem[]>([]);

    return <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>{children}</BreadcrumbContext.Provider>;
};

export const useBreadcrumb = () => {
    const context = React.useContext(BreadcrumbContext);
    if (!context) throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
    return context;
};
