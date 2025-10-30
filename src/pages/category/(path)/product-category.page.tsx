import { InfoOutline } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Pagination,
    PaginationItem,
    Select,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ProductOverview } from "~/components/common";
import { LandingBreadcrumbs } from "~/components/layout/breadcrumbs";

// const params = useParams<{ slug: string }>();
const filterOptions = {
    types: ["Headphones", "Earbuds", "Speakers"],
    conditions: ["All", "New", "Like new", "Good", "Fair", "Poor"],
    brands: ["Any", "Sony", "Apple", "Bose", "Sennheiser", "Beats"],
    features: ["ANC", "BT 5.0", "Wireless", "Water resistant"],
};

const mockProducts = [
    {
        id: 1,
        name: "Sony WH-1000XM4",
        price: 165,
        originalPrice: 210,
        condition: "Battery 92%",
        features: ["ANC", "Black"],
        isVerified: true,
        isFairPrice: true,
        image: "https://example.com/sony-headphones.jpg",
    },
    {
        id: 2,
        name: "AirPods Pro (2nd gen)",
        price: 135,
        originalPrice: 170,
        condition: "Case 88%",
        features: ["MagSafe", "Below market"],
        isAIVerified: true,
        isDeal: true,
        image: "https://example.com/airpods.jpg",
    },
    // Add more mock products as needed
];

const ProductCategoryPage: React.FC = () => {
    const navigate = useNavigate();

    const [selectedFilters, setSelectedFilters] = React.useState({
        type: "Headphones",
        condition: "All",
        priceRange: [20, 600],
        brand: "Any",
        aiVerified: false,
        features: [] as string[],
    });

    const [sortBy, setSortBy] = React.useState("Popular");

    const handleFilterChange = (filterType: keyof typeof selectedFilters, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const handleFeatureToggle = (feature: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
        }));
    };

    const clearFilters = () => {
        setSelectedFilters({
            type: "Headphones",
            condition: "All",
            priceRange: [20, 600],
            brand: "Any",
            aiVerified: false,
            features: [],
        });
    };

    const applyFilters = () => {
        // Apply filter logic here
        console.log("Applying filters:", selectedFilters);
    };

    return (
        <Box className="container mx-auto py-4">
            <LandingBreadcrumbs />

            <Grid container spacing={3}>
                {/* Sidebar Filters */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box className="rounded-xl border border-gray-200 bg-white p-4">
                        <Typography variant="h6" fontWeight={600} className="mb-4">
                            Filters
                        </Typography>

                        {/* Type Filter */}
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-2 font-semibold">
                                Type
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {filterOptions.types.map((type) => (
                                    <Chip
                                        key={type}
                                        label={type}
                                        variant={selectedFilters.type === type ? "filled" : "outlined"}
                                        color={selectedFilters.type === type ? "primary" : "default"}
                                        onClick={() => handleFilterChange("type", type)}
                                        className="px-1"
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <Divider className="my-4" />

                        {/* Condition Filter */}
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-2 font-semibold">
                                Condition
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {filterOptions.conditions.map((condition) => (
                                    <Chip
                                        key={condition}
                                        label={condition}
                                        variant={selectedFilters.condition === condition ? "filled" : "outlined"}
                                        color={selectedFilters.condition === condition ? "primary" : "default"}
                                        onClick={() => handleFilterChange("condition", condition)}
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <Divider className="my-4" />

                        {/* Price Range */}
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-2 font-semibold">
                                Price
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center" className="mb-2">
                                <TextField
                                    size="small"
                                    value={`$${selectedFilters.priceRange[0]}`}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value.replace("$", "")) || 0;
                                        handleFilterChange("priceRange", [value, selectedFilters.priceRange[1]]);
                                    }}
                                    sx={{ width: 80 }}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    size="small"
                                    value={`$${selectedFilters.priceRange[1]}`}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value.replace("$", "")) || 0;
                                        handleFilterChange("priceRange", [selectedFilters.priceRange[0], value]);
                                    }}
                                    sx={{ width: 80 }}
                                />
                            </Stack>
                            <Slider
                                value={selectedFilters.priceRange}
                                onChange={(_, value) => handleFilterChange("priceRange", value)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                valueLabelFormat={(value) => `$${value}`}
                            />
                        </Box>

                        <Divider className="my-4" />

                        {/* Brand Filter */}
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-2 font-semibold">
                                Brand
                            </Typography>
                            <FormControl fullWidth size="small">
                                <Select
                                    value={selectedFilters.brand}
                                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                                >
                                    {filterOptions.brands.map((brand) => (
                                        <MenuItem key={brand} value={brand}>
                                            {brand}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Divider className="my-4" />

                        {/* AI Verified */}
                        <Box className="mb-4">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedFilters.aiVerified}
                                        onChange={(e) => handleFilterChange("aiVerified", e.target.checked)}
                                        size="small"
                                    />
                                }
                                label="AI Verified only"
                            />
                        </Box>

                        <Divider className="my-4" />

                        {/* Features */}
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-2 font-semibold">
                                Features
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {filterOptions.features.map((feature) => (
                                    <Chip
                                        key={feature}
                                        label={feature}
                                        variant={selectedFilters.features.includes(feature) ? "filled" : "outlined"}
                                        color={selectedFilters.features.includes(feature) ? "primary" : "default"}
                                        onClick={() => handleFeatureToggle(feature)}
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {/* Action Buttons */}
                        <Stack spacing={2} className="mt-6">
                            <Button variant="outlined" fullWidth onClick={clearFilters}>
                                Clear
                            </Button>
                            <Button variant="contained" fullWidth onClick={applyFilters}>
                                Apply
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid size={{ xs: 12, md: 9 }}>
                    {/* Header with Sort and View Options */}
                    <Box className="mb-4 flex items-center justify-end">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Sort:
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <MenuItem value="Popular">Popular</MenuItem>
                                    <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                                    <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
                                    <MenuItem value="Newest">Newest</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="body2" color="text.secondary">
                                AI Verified only
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Within 25 mi
                            </Typography>
                        </Stack>

                        {/* <Stack direction="row" spacing={1}>
                            <Button
                                variant={viewMode === "grid" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setViewMode("grid")}
                            >
                                <GridView />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setViewMode("list")}
                            >
                                <ViewList />
                            </Button>
                        </Stack> */}
                    </Box>

                    {/* Products Grid/List */}
                    <Grid container spacing={2}>
                        {mockProducts.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                <ProductOverview product={product} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <Box className="mt-6 flex justify-center">
                        <Pagination
                            count={10}
                            color="primary"
                            size="small"
                            showFirstButton
                            showLastButton
                            shape="rounded"
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "12px", // rounded-xl (~12px in Tailwind)
                                        p: 2,
                                        border: "1px solid #e0e0e0",
                                        mx: 0.5, // spacing between items

                                        // selected page style
                                        "&.Mui-selected": {
                                            bgcolor: "primary.main",
                                            color: "white",
                                            fontWeight: "bold",
                                            border: "none",
                                            "&:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>

                    {/* Results Summary */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className="mt-4 rounded-xl border border-gray-200 bg-white px-3 py-2 text-center"
                    >
                        <Typography fontSize={14} color="text.secondary" className="flex items-center justify-center">
                            <span>
                                <InfoOutline fontSize="small" className="me-2" />
                            </span>
                            Showing 1-6 of 1,128 results in Audio
                        </Typography>

                        <Stack direction="row" justifyContent="center" spacing={2}>
                            <Button
                                variant="outlined"
                                size="small"
                                className="mt-2"
                                onClick={() => navigate("/category")}
                            >
                                Back to Categories
                            </Button>
                            <Button variant="contained" size="small" className="ml-2 mt-2">
                                Go to cart
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductCategoryPage;
