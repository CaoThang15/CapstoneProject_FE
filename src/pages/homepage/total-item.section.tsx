import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import ProductSummary from "~/components/product/product.summary";

export const TotalItemSection: React.FC = () => {
    return (
        <Box className="total-products">
            <Typography variant="h6" className="mt-3 font-semibold">
                Total Products
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
