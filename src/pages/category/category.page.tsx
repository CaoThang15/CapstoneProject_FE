import { Bolt, CheckCircle, Done, FilterAlt, Shield, Tune } from "@mui/icons-material";
import {
    Box,
    Breadcrumbs,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import React from "react";
import { CategoryCard } from "~/components/common";
import { Category } from "~/entities";

const categories: Category[] = [
    {
        id: 1,
        name: "Laptops",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m1_2_1_3.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 2,
        name: "Phones",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_air-3_2.jpg",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 3,
        name: "Tablets",
        imageUrl:
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/ipad_10_9_inch_wifi_cellular_-_yellow_pdp_imageUrl_position-1b_wwen_1_1.jpg",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 4,
        name: "Consoles",
        imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/p/s/ps5_2tb_1_2.webp",
        createdBy: new Date().getTime(),
        lastUpdatedBy: 1,
    },
    {
        id: 5,
        name: "Audio",
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
    },
];

const FILTER_CONDITIONS = ["All", "New", "Used", "Refurbished"] as const;

const CategoryPage: React.FC = () => {
    // State (placeholder only – real filtering logic to be added later)
    const [condition, setCondition] = React.useState<string>("All");
    const [priceRange, setPriceRange] = React.useState<[number, number]>([100, 2000]);
    const [brandAny] = React.useState<boolean>(true);
    const [nearby, setNearby] = React.useState<boolean>(true);
    const [verified, setVerified] = React.useState<boolean>(true);
    const [fraudShield] = React.useState<boolean>(true);
    const [sort, setSort] = React.useState<string>("popular");
    const [radius, setRadius] = React.useState<string>("25");

    const handleApply = () => {
        // TODO: integration API
    };

    const handleClear = () => {
        setCondition("All");
        setPriceRange([100, 2000]);
        setNearby(true);
        setVerified(true);
    };

    const FilterCard: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
        <Box className="rounded-xl border border-gray-200 bg-white px-3 py-2">
            <Typography className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                {label}
            </Typography>
            {children}
        </Box>
    );

    const Filters = (
        <Stack spacing={2} className="sticky top-4">
            <Typography className="text-sm font-semibold">Filters</Typography>

            <FilterCard label="Condition">
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {FILTER_CONDITIONS.map((c) => {
                        const active = c === condition;
                        return (
                            <Chip
                                key={c}
                                size="small"
                                label={c}
                                onClick={() => setCondition(c)}
                                icon={active ? <Done sx={{ fontSize: 14 }} /> : undefined}
                                sx={{
                                    fontSize: 12,
                                    bgcolor: active ? "primary.light" : "#f5f7f7",
                                    color: active ? "primary.main" : "text.secondary",
                                    "& .MuiChip-label": { px: 1 },
                                }}
                            />
                        );
                    })}
                </Stack>
            </FilterCard>

            <FilterCard label="Price">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                        size="small"
                        label={`$${priceRange[0]}`}
                        onClick={() => setPriceRange(([min, max]) => [min - 50 < 0 ? 0 : min - 50, max])}
                        sx={{ fontSize: 12, bgcolor: "primary.light", color: "primary.main" }}
                    />
                    <Typography className="text-xs text-gray-500">—</Typography>
                    <Chip
                        size="small"
                        label={`$${priceRange[1].toLocaleString()}`}
                        onClick={() => setPriceRange(([min, max]) => [min, max + 100 > 5000 ? 5000 : max + 100])}
                        sx={{ fontSize: 12, bgcolor: "primary.light", color: "primary.main" }}
                    />
                </Stack>
            </FilterCard>

            <FilterCard label="Brand">
                <Chip
                    size="small"
                    label={brandAny ? "Any" : "Selected"}
                    sx={{ fontSize: 12, bgcolor: "primary.light", color: "primary.main" }}
                />
            </FilterCard>

            <FilterCard label="Location">
                <Chip
                    size="small"
                    label={nearby ? "Nearby" : "All"}
                    onClick={() => setNearby((p) => !p)}
                    sx={{
                        fontSize: 12,
                        bgcolor: nearby ? "primary.light" : "#f5f5f5",
                        color: nearby ? "primary.main" : "text.secondary",
                    }}
                />
            </FilterCard>

            <FilterCard label="AI Verified">
                <Chip
                    size="small"
                    label={verified ? "On" : "Off"}
                    onClick={() => setVerified((p) => !p)}
                    icon={<Shield sx={{ fontSize: 14 }} />}
                    sx={{
                        fontSize: 12,
                        bgcolor: verified ? "primary.light" : "#f5f5f5",
                        color: verified ? "primary.main" : "text.secondary",
                        "& .MuiChip-label": { px: 0.5 },
                    }}
                />
            </FilterCard>

            <Stack direction="row" spacing={1}>
                <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    color="inherit"
                    onClick={handleClear}
                    className="!normal-case"
                >
                    Clear
                </Button>
                <Button fullWidth size="small" variant="contained" onClick={handleApply} className="!normal-case">
                    Apply
                </Button>
            </Stack>

            {fraudShield && (
                <Chip
                    label="Fraud shield on"
                    size="small"
                    icon={<CheckCircle sx={{ fontSize: 14 }} />}
                    sx={{
                        bgcolor: "#008f5a",
                        color: "white",
                        "& .MuiChip-label": { fontSize: 12 },
                    }}
                />
            )}
        </Stack>
    );

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

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
                className="mb-3"
            >
                <Breadcrumbs separator=">">
                    <Typography
                        color="text.secondary"
                        className="cursor-pointer text-sm"
                        onClick={() => (window.location.href = "/")}
                    >
                        Categories
                    </Typography>
                    <Typography className="text-sm font-semibold">All</Typography>
                </Breadcrumbs>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={sort}
                        onChange={(_, val) => val && setSort(val)}
                        sx={{
                            bgcolor: "white",
                            border: "1px solid",
                            borderColor: "grey.200",
                            borderRadius: 2,
                            "& .MuiToggleButton-root": {
                                textTransform: "none",
                                fontSize: 12,
                                px: 1.5,
                            },
                        }}
                    >
                        <ToggleButton value="popular">Sort: Popular</ToggleButton>
                        <ToggleButton value="new">Newest</ToggleButton>
                        <ToggleButton value="priceLow">Price Low</ToggleButton>
                        <ToggleButton value="priceHigh">Price High</ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={radius}
                        onChange={(_, val) => val && setRadius(val)}
                        sx={{
                            bgcolor: "white",
                            border: "1px solid",
                            borderColor: "grey.200",
                            borderRadius: 2,
                            "& .MuiToggleButton-root": {
                                textTransform: "none",
                                fontSize: 12,
                                px: 1.5,
                            },
                        }}
                    >
                        <ToggleButton value="10">Within 10 mi</ToggleButton>
                        <ToggleButton value="25">Within 25 mi</ToggleButton>
                        <ToggleButton value="50">Within 50 mi</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {/* Sidebar */}
                <Grid size={{ xs: 12, md: 3, lg: 2 }} className="hidden md:block">
                    {Filters}
                </Grid>

                {/* Main Content */}
                <Grid size={{ xs: 12, md: 9, lg: 10 }}>
                    <Stack spacing={3}>
                        {/* Categories Grid */}
                        <Grid container spacing={2}>
                            {categories.map((c) => (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={c.id}>
                                    <CategoryCard category={c} />
                                </Grid>
                            ))}
                        </Grid>

                        <Divider />

                        {/* Placeholder for products list (future) */}
                        <Box
                            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"
                            sx={{ minHeight: 180 }}
                        >
                            <Bolt fontSize="large" className="mb-2 text-gray-400" />
                            <Typography className="mb-1 text-sm font-semibold">
                                Product results will appear here
                            </Typography>
                            <Typography className="text-xs text-gray-500">
                                Integrate API / filtering logic to populate items.
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryPage;
