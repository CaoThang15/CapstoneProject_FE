import {
    Box,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React from "react";

interface ProductFilterProps {
    onChange: (params: Partial<Record<string, any>>) => void;
}

const filterOptions = {
    types: ["Headphones", "Earbuds", "Speakers"],
    conditions: ["All", "New", "Like new", "Good", "Fair", "Poor"],
    brands: ["Any", "Sony", "Apple", "Bose", "Sennheiser", "Beats"],
    features: ["ANC", "BT 5.0", "Wireless", "Water resistant"],
};

const ProductFilter: React.FC<ProductFilterProps> = ({ onChange }) => {
    const [selectedFilters, setSelectedFilters] = React.useState({
        type: "Headphones",
        condition: "All",
        minPrice: 0,
        maxPrice: 1000,
        brand: "Any",
        aiVerified: false,
        features: [] as string[],
    });

    const handleFilterChange = React.useCallback(
        (filterType: keyof typeof selectedFilters, value: any) => {
            setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
            onChange({ [filterType]: value });
        },
        [onChange],
    );

    const handleFeatureToggle = React.useCallback(
        (feature: string) => {
            setSelectedFilters((prev) => {
                const newFeatures = prev.features.includes(feature)
                    ? prev.features.filter((f) => f !== feature)
                    : [...prev.features, feature];
                onChange({ features: newFeatures });
                return { ...prev, features: newFeatures };
            });
        },
        [onChange],
    );

    const debouncedOnChangePrice = React.useMemo(
        () =>
            debounce((values: [number, number]) => {
                const [minPrice, maxPrice] = values;
                onChange({ minPrice, maxPrice });
            }, 500),
        [onChange],
    );

    React.useEffect(() => {
        return () => {
            debouncedOnChangePrice.cancel();
        };
    }, [debouncedOnChangePrice]);

    return (
        <Box className="rounded-xl border border-gray-200 bg-white p-4">
            <Typography variant="h6" fontWeight={600} className="mb-4">
                Filters
            </Typography>

            {/* Type */}
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
                            size="small"
                        />
                    ))}
                </Stack>
            </Box>

            <Divider className="my-4" />

            {/* Condition */}
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

            {/* Price */}
            <Box className="mb-4">
                <Typography variant="subtitle2" className="mb-2 font-semibold">
                    Price
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" className="mb-2">
                    <TextField
                        size="small"
                        value={`$${selectedFilters.minPrice}`}
                        onChange={(e) => {
                            const value = parseInt(e.target.value.replace("$", "")) || 0;
                            handleFilterChange("minPrice", value);
                        }}
                        sx={{ width: 80 }}
                    />
                    <Typography>-</Typography>
                    <TextField
                        size="small"
                        value={`$${selectedFilters.maxPrice}`}
                        onChange={(e) => {
                            const value = parseInt(e.target.value.replace("$", "")) || 0;
                            handleFilterChange("maxPrice", value);
                        }}
                        sx={{ width: 80 }}
                    />
                </Stack>
                <Slider
                    value={[selectedFilters.minPrice, selectedFilters.maxPrice]}
                    onChange={(_, value) => {
                        setSelectedFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
                    }}
                    onChangeCommitted={(_, value) => {
                        debouncedOnChangePrice(value as [number, number]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    valueLabelFormat={(value) => `$${value}`}
                />
            </Box>

            <Divider className="my-4" />

            {/* Brand */}
            <Box className="mb-4">
                <Typography variant="subtitle2" className="mb-2 font-semibold">
                    Brand
                </Typography>
                <FormControl fullWidth size="small">
                    <Select value={selectedFilters.brand} onChange={(e) => handleFilterChange("brand", e.target.value)}>
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
        </Box>
    );
};

export default ProductFilter;
