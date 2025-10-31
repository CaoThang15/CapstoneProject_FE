import { Link, Typography } from "@mui/material";
import classNames from "classnames";
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
            <span className={classNames("text-[14]", { "text-gray-500": !isActive, "text-black": isActive })}>
                {breadcrumb.label}
            </span>
        </span>
    );

    if (isLast || !breadcrumb.path) {
        return (
            <Typography
                fontSize={14}
                sx={{
                    fontWeight: isActive ? 600 : 500,
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
            fontSize={isManagerBreadcrumb ? 16 : 14}
            className={classNames({ "text-gray-600": !isActive, "text-black": isActive })}
            sx={{
                textDecoration: "none",
                fontWeight: isActive ? 600 : 400,
                "&:hover": {
                    textDecoration: "underline",
                    color: "primary.main",
                },
                cursor: "pointer",
                border: "none",
                background: "transparent",
                padding: 0,
                display: "flex",
                alignItems: "center",
            }}
        >
            {content}
        </Link>
    );
};
