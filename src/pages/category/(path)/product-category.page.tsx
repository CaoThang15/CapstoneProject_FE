import React from "react";
import {
    Box,
    CircularProgress,
    FormControl,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { ProductOverview } from "~/components/common";
import { LandingBreadcrumbs } from "~/components/layout/breadcrumbs";
import { useParamFilter } from "~/hooks";
import { useQueryCategoryBySlug } from "~/services/categories/hooks/queries";
import { useQueryGetListProducts } from "~/services/products/hooks/queries";
import ProductFilter from "./product-filter";

const ProductCategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: category, isLoading: isLoadingCategory } = useQueryCategoryBySlug({ slug });

    const { params, onChange } = useParamFilter();
    const {
        data: { items: listProducts },
        isLoading: isLoadingProducts,
        fetchNextPage,
        hasNextPage,
    } = useQueryGetListProducts({ categoryId: category?.id, ...params });

    const [sortBy, setSortBy] = React.useState("Price: Low to High");
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setSortBy(value);

        switch (value) {
            case "Price: Low to High":
                onChange({ orderBy: "price", order: "asc" });
                break;
            case "Price: High to Low":
                onChange({ orderBy: "price", order: "desc" });
                break;
            case "Newest":
                onChange({ orderBy: "createdAt", order: "desc" });
                break;
            default:
                onChange({ orderBy: undefined, order: undefined });
        }
    };

    return (
        <Box className="container mx-auto py-4">
            <LandingBreadcrumbs />

            <Grid container spacing={3}>
                {/* Sidebar Filters */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <ProductFilter onChange={onChange} />
                </Grid>

                {/* Main Content */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box className="mb-4 flex items-center justify-end">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Sort:
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 180 }}>
                                <Select value={sortBy} onChange={handleSortChange}>
                                    <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                                    <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
                                    <MenuItem value="Newest">Newest</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    {isLoadingCategory || isLoadingProducts ? (
                        <Box className="flex justify-center py-20">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <InfiniteScroll
                            dataLength={listProducts.length}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={
                                <Box className="flex justify-center py-4">
                                    <CircularProgress size={24} />
                                </Box>
                            }
                        >
                            {listProducts?.length <= 0 ? (
                                <Box className="flex justify-center py-20">
                                    <Typography variant="body1" color="text.secondary">
                                        No products found
                                    </Typography>
                                </Box>
                            ) : (
                                <Grid container spacing={2}>
                                    {listProducts.map((product) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                            <ProductOverview product={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </InfiniteScroll>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductCategoryPage;
