import { FilterAlt, Tune } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import React from "react";
import { CategoryCard, LoadingContainer } from "~/components/common";
import LandingBreadcrumbs from "~/components/layout/breadcrumbs/landing.breadcrumbs";
import { useQueryCategories } from "~/services/categories/hooks/queries";

const CategoryPage: React.FC = () => {
    const { data: listCategories, isLoading } = useQueryCategories();

    return (
        <Box className="container mx-auto py-4">
            {/* Mobile filter trigger */}
            <Box className="block md:hidden">
                <Stack direction="row" spacing={1} className="mb-3">
                    <IconButton color="primary" size="small">
                        <Tune fontSize="small" />
                    </IconButton>
                    <IconButton color="primary" size="small">
                        <FilterAlt fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>
            <LandingBreadcrumbs />
            <LoadingContainer isLoading={isLoading}>
                <Grid container spacing={3}>
                    {/* Main Content */}
                    <Grid size={{ xs: 12 }}>
                        <Stack spacing={3}>
                            {/* Categories Grid */}
                            <Grid container spacing={2}>
                                {listCategories.map((c) => (
                                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={c.id}>
                                        <CategoryCard category={c} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </LoadingContainer>
        </Box>
    );
};

export default CategoryPage;
