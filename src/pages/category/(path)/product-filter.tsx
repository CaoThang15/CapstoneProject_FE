import { Box, Divider, Slider, Typography } from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { SearchBox } from "~/components/common/search-box";
import { useQueryGetProductFilterAttributes } from "~/services/products/hooks/queries";
import { formatCurrencyVND } from "~/utils/currency";

interface ProductFilterProps {
    onChange: (params: Partial<Record<string, any>>) => void;
    categoryId?: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onChange, categoryId }) => {
    const { data: filterAttributes } = useQueryGetProductFilterAttributes({
        categoryId,
    });

    const [selectedFilters, setSelectedFilters] = React.useState({
        minPrice: 0,
        maxPrice: 1000,
        keyword: "",
    });

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

    React.useEffect(() => {
        if (!filterAttributes) return;

        setSelectedFilters((prev) => ({
            ...prev,
            minPrice: filterAttributes.minPrice,
            maxPrice: filterAttributes.maxPrice,
        }));
    }, [filterAttributes]);

    return (
        <Box className="rounded-xl border border-gray-200 bg-white p-4">
            <Typography variant="h6" fontWeight={600} className="mb-4">
                Filters
            </Typography>

            <Box className="mb-4">
                <SearchBox
                    onChange={(value) => {
                        setSelectedFilters((prev) => ({ ...prev, keyword: value }));
                        onChange({ keyword: value });
                    }}
                    placeholder="Search ..."
                />
            </Box>

            <Divider className="my-4" />

            {/* Price */}
            <Box>
                <Box className="mb-4 flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold">
                        Price
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="ml-2">
                        ({formatCurrencyVND(selectedFilters.minPrice)} - {formatCurrencyVND(selectedFilters.maxPrice)})
                    </Typography>
                </Box>
                <Slider
                    value={[selectedFilters.minPrice, selectedFilters.maxPrice]}
                    onChange={(_, value) => {
                        setSelectedFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
                    }}
                    onChangeCommitted={(_, value) => {
                        debouncedOnChangePrice(value as [number, number]);
                    }}
                    valueLabelDisplay="auto"
                    min={filterAttributes.minPrice}
                    max={filterAttributes.maxPrice}
                    valueLabelFormat={(value) => `${formatCurrencyVND(value)}`}
                    step={10000}
                />
            </Box>

            <Divider className="my-4" />
        </Box>
    );
};

export default ProductFilter;
