import { Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { IBreadcrumbItem } from "~/configs/breadcrumbs.config";

interface BreadcrumbItemProps {
    breadcrumb: IBreadcrumbItem;
    isLast: boolean;
    isManagerBreadcrumb?: boolean;
}
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ breadcrumb, isLast, isManagerBreadcrumb = false }) => {
    const navigate = useNavigate();

    const handleBreadcrumbClick = (path?: string) => {
        if (path) {
            navigate(path);
        }
    };

    const isActive = breadcrumb.path === location.pathname;

    const content = (
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {breadcrumb.icon}
            {breadcrumb.label}
        </span>
    );

    if (isLast || !breadcrumb.path) {
        return (
            <Typography
                sx={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.875rem",
                    color: isActive ? "primary.main" : "text.primary",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {content}
            </Typography>
        );
    }

    return (
        <Link
            component="button"
            variant="body2"
            onClick={() => handleBreadcrumbClick(breadcrumb.path)}
            sx={{
                textDecoration: "none",
                color: isActive ? "primary.main" : "text.secondary",
                fontWeight: isActive ? 600 : 400,
                "&:hover": {
                    textDecoration: "underline",
                    color: "primary.main",
                },
                cursor: "pointer",
                border: "none",
                background: "transparent",
                padding: 0,
                font: "inherit",
                fontSize: isManagerBreadcrumb ? "1rem" : "0.875rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            {content}
        </Link>
    );
};
