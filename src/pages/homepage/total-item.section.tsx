import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import { LoadingContainer } from "~/components/common";
import ProductSummary from "~/components/common/product/product.summary";
import { useQueryGetProductWithPagination } from "~/services/products/hooks/queries";

export const TotalItemSection: React.FC = () => {
    const { data, isLoading } = useQueryGetProductWithPagination({ page: 1, pageSize: 20 });
    return (
        <Box className="total-products">
            <Typography variant="h6" className="mt-3 font-semibold">
                Total Products
            </Typography>
            <LoadingContainer isLoading={isLoading}>
                <Grid container spacing={2} className="mt-3">
                    {data?.items.map((product) => (
                        <Grid key={product.id} size={3}>
                            <ProductSummary product={product} />
                        </Grid>
                    ))}
                </Grid>
            </LoadingContainer>
        </Box>
    );
};
