import { BoxProps, Breadcrumbs, Stack } from "@mui/material";
import React from "react";
import { BreadcrumbItem } from "./breadcrumb.item";
import { useBreadcrumb } from "./manager-breadcrumb.context";

const AuthenticatedBreadcrumbs: React.FC<BoxProps> = () => {
    const { breadcrumbs } = useBreadcrumb();

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

export default AuthenticatedBreadcrumbs;
