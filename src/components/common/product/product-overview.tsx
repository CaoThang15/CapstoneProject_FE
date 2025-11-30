import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { useAuth } from "~/contexts/auth.context";
import { Product } from "~/entities/product.entity";
import { LocalStorageCartItems } from "~/pages/cart/types";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";
import { AddToCartToastContent, ImageRenderer } from "..";

interface Props {
    product: Product;
}

const ProductOverview: React.FC<Props> = ({ product }) => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            if (user.id === product?.seller.id) {
                showToast.error("You cannot add your own product to the cart.");
                return;
            }
        }

        saveLocalCartProducts((prev) => {
            const currentQty = prev[product.id]?.quantity || 0;

            return {
                ...prev,
                [product.id]: { quantity: currentQty + 1, sellerId: product.seller.id },
            };
        });

        showToast.success(<AddToCartToastContent />);
    };

    return (
        <Box
            className="h-full rounded-xl border border-gray-200 bg-white p-4"
            onClick={() => (window.location.href = `/product/${product.slug}`)}
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
                <ImageRenderer src={product.sharedFiles?.[0]?.path} alt={product.name} />
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
                {product.properties.slice(0, 3).map((property) => (
                    <Chip key={property.id} label={property.value} size="small" variant="outlined" />
                ))}
                {product.properties.length > 3 && (
                    <Chip label={`+${product.properties.length - 3} more`} size="small" variant="outlined" />
                )}
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={1} alignItems="center" className="mb-3">
                <Typography variant="h6" fontWeight={600}>
                    {formatCurrencyVND(product.price)}
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
