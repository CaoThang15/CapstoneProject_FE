import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { showToast } from "~/utils";

interface Props {
    product: any;
}

const AddToCartToastContent: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box className="flex items-center gap-2">
            <Typography variant="body2">Added to cart</Typography>
            <Button variant="text" size="small" color="primary" onClick={() => navigate("/cart")}>
                View Cart
            </Button>
        </Box>
    );
};

const ProductOverview: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        showToast.success(<AddToCartToastContent />);
    };

    return (
        <Box
            className="rounded-xl border border-gray-200 bg-white p-4"
            onClick={handleNavigate}
            sx={{ cursor: "pointer" }}
        >
            {/* Product Image */}
            <Box
                sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Product Image
                </Typography>
            </Box>

            {/* Product Info */}
            <Typography variant="subtitle1" fontWeight={600} className="mb-1">
                {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" className="mb-2">
                {product.condition}
            </Typography>

            {/* Features/Tags */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap className="mb-2">
                {product.features.map((feature: any) => (
                    <Chip key={feature} label={feature} size="small" variant="outlined" />
                ))}
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={1} alignItems="center" className="mb-3">
                <Typography variant="h6" fontWeight={600}>
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                    ${product.originalPrice}
                </Typography>
            </Stack>

            {/* Add to Cart Button */}
            <Button variant="contained" fullWidth size="small" onClick={handleAddToCart}>
                Add to cart
            </Button>
        </Box>
    );
};

export default ProductOverview;
