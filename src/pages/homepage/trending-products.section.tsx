import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { BoxSection, LoadingContainer } from "~/components/common";
import ProductSummary from "~/components/common/product/product.summary";
import { PaginationOrderBy } from "~/constants/enums";
import { useQueryGetProductWithPagination } from "~/services/products/hooks/queries";

type ProductFilter = "for_you" | "newest";

export const TrendingProductsSection: React.FC = () => {
    const [filter, setFilter] = React.useState<ProductFilter>("for_you");

    const { data, isLoading } = useQueryGetProductWithPagination({
        page: 1,
        pageSize: 20,
        orderBy: filter === "newest" ? PaginationOrderBy.DESC : null,
        order: filter === "newest" ? "createdAt" : null,
    });

    return (
        <BoxSection>
            <Box className="flex items-center space-x-2">
                <Button variant="text">
                    <Typography
                        color={filter === "for_you" ? "textPrimary" : "textDisabled"}
                        fontWeight="bold"
                        onClick={() => setFilter("for_you")}
                    >
                        Dành cho bạn
                    </Typography>
                </Button>
                <Button variant="text">
                    <Typography
                        color={filter === "newest" ? "textPrimary" : "textDisabled"}
                        fontWeight="bold"
                        onClick={() => setFilter("newest")}
                    >
                        Mới nhất
                    </Typography>
                </Button>
            </Box>
            <LoadingContainer isLoading={isLoading}>
                <Grid container spacing={2} className="mt-3">
                    {data?.items.map((product) => (
                        <Grid key={product.id} size={12 / 5}>
                            <ProductSummary product={product} />
                        </Grid>
                    ))}
                </Grid>
            </LoadingContainer>
        </BoxSection>
    );
};
