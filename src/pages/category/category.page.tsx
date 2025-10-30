import { FilterAlt, Tune } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import React from "react";
import { CategoryCard } from "~/components/common";
import LandingBreadcrumbs from "~/components/layout/breadcrumbs/landing.breadcrumbs";
import { Category } from "~/entities";

const categories: Category[] = [
    {
        id: 1,
        name: "Laptops",
        slug: "laptops",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m1_2_1_3.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 2,
        name: "Phones",
        slug: "phones",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-3_2.jpg",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 3,
        name: "Tablets",
        slug: "tablets",
        imageUrl:
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad_10_9_inch_wifi_cellular_-_yellow_pdp_imageUrl_position-1b_wwen_1_1.jpg",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 4,
        name: "Consoles",
        slug: "consoles",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/s/ps5_2tb_1_2.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 5,
        name: "Audio",
        slug: "audio",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/i/airpods_3_1_1.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 6,
        name: "Wearables",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/p/apple_watch_s9_41mm_1.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
        slug: "wearables",
    },
];

const CategoryPage: React.FC = () => {
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

            <Grid container spacing={3}>
                {/* Main Content */}
                <Grid size={{ xs: 12 }}>
                    <Stack spacing={3}>
                        {/* Categories Grid */}
                        <Grid container spacing={2}>
                            {categories.map((c) => (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={c.id}>
                                    <CategoryCard category={c} />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryPage;
