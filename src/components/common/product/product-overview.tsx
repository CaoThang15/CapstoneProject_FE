import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { showToast } from "~/utils";
import { AddToCartToastContent } from "..";
import { Product } from "~/entities/product.entity";
import DefaultImage from "~/assets/images/default_image.webp";

interface Props {
    product: Product;
}

const ProductOverview: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        showToast.success(<AddToCartToastContent product={product} />);
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
                    position: "relative",
                    width: "100%",
                    height: 200,
                    overflow: "hidden",
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: "#f5f5f5",
                }}
            >
                <Box
                    component="img"
                    src={product.sharedFiles?.[0]?.path || DefaultImage}
                    alt={product.sharedFiles?.[0]?.name || product.name || "Product image"}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.target as HTMLImageElement).src = DefaultImage;
                    }}
                    loading="lazy"
                    decoding="async"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "opacity 0.3s ease",
                    }}
                />
            </Box>

            {/* Product Info */}
            <Typography variant="subtitle1" fontWeight={600} className="mb-1">
                {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" className="mb-2">
                {product.note}
            </Typography>

            {/* Features/Tags */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap className="mb-2">
                {product.properties.map((property) => (
                    <Chip key={property.id} label={property.value} size="small" variant="outlined" />
                ))}
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={1} alignItems="center" className="mb-3">
                <Typography variant="h6" fontWeight={600}>
                    ${product.price}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                    ${product.originalPrice}
                </Typography> */}
            </Stack>

            {/* Add to Cart Button */}
            <Button variant="contained" fullWidth size="small" onClick={handleAddToCart}>
                Add to cart
            </Button>
        </Box>
    );
};

export default ProductOverview;
