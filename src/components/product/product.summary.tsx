import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button, Rating, Typography } from "@mui/material";
import React from "react";
import { formatCurrencyVND } from "~/utils/currency";

const ProductSummary: React.FC = () => {
    return (
        <Box className="rounded-xl border border-gray-200 bg-white px-5 pb-3 pt-2">
            <img
                src="https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-gold-select-201810_4_3_1_1_1_1.jpg"
                alt="Product"
                className="h-[300px] w-full object-cover"
            />
            <Box className="flex justify-between py-2">
                <Typography className="text-lg font-semibold">Macbook Air 2020 M1 256GB</Typography>
                <Typography className="text-right text-lg font-semibold text-red-500">
                    {formatCurrencyVND(25000000)}
                </Typography>
            </Box>
            <Rating
                value={4.5}
                readOnly
                size="small"
                sx={{
                    "& .MuiRating-iconFilled": {
                        color: "primary.main",
                    },
                }}
            />
            <Typography className="mt-1 text-sm text-gray-500">
                Seller: <span className="font-semibold">Apple</span>
            </Typography>
            <Typography className="mt-1 text-sm text-gray-500">Location: Hanoi</Typography>
            <Button startIcon={<AddShoppingCart />} variant="contained" fullWidth color="light" className="mt-3">
                Add to Cart
            </Button>
        </Box>
    );
};

export default ProductSummary;
