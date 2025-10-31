import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProductSummary from "~/components/common/product/product.summary";

export const TrendingProductsSection: React.FC = () => {
    return (
        <Box className="trending-products">
            <Typography variant="h6" className="mt-3 font-semibold">
                Trending Products
            </Typography>
            <Grid container spacing={2} className="mt-3">
                <Grid size={3}>
                    <ProductSummary />
                </Grid>
                <Grid size={3}>
                    <ProductSummary />
                </Grid>
                <Grid size={3}>
                    <ProductSummary />
                </Grid>
                <Grid size={3}>
                    <ProductSummary />
                </Grid>
            </Grid>
        </Box>
    );
};
