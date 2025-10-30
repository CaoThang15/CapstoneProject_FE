import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { getBreadcrumbItems } from "~/configs/breadcrumbs.config";
import { BreadcrumbItem } from "./breadcrumb.item";
import classNames from "classnames";

const LandingBreadcrumbs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const location = useLocation();

    const breadcrumbItems = getBreadcrumbItems(location.pathname);

    // Don't render breadcrumbs for home page or if only one item
    if (breadcrumbItems.length <= 1) {
        return null;
    }

    return (
        <Box className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNext fontSize="small" />}
                className={classNames(className, "ps-2")}
                sx={{
                    "& .MuiBreadcrumbs-separator": {
                        color: "text.secondary",
                    },
                }}
                {...props}
            >
                {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem key={index} breadcrumb={item} isLast={index === breadcrumbItems.length - 1} />
                ))}
            </Breadcrumbs>
        </Box>
    );
};

export default LandingBreadcrumbs;
