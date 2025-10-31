import { Breadcrumbs, Stack } from "@mui/material";
import React from "react";
import { BreadcrumbItem } from "./breadcrumb.item";
import { useManagerBreadcrumb } from "./manager-breadcrumb.context";

const HeaderBreadcrumbs: React.FC = () => {
    const { breadcrumbs } = useManagerBreadcrumb();

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Breadcrumbs separator="›">
                {breadcrumbs.map((bc, idx) => (
                    <BreadcrumbItem key={idx} breadcrumb={bc} isLast={false} isManagerBreadcrumb />
                ))}
            </Breadcrumbs>
        </Stack>
    );
};

export default HeaderBreadcrumbs;
