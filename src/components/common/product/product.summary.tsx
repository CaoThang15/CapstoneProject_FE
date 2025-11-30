import { AddShoppingCart, LocationPin } from "@mui/icons-material";
import { Box, Button, Rating, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { Product } from "~/entities/product.entity";
import { LocalStorageCartItems } from "~/pages/cart/types";
import { showToast } from "~/utils";
import { formatCurrencyVND } from "~/utils/currency";
import { AddToCartToastContent, ImageRenderer } from "..";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth.context";

interface ProductSummaryProps {
    product?: Product;
}
const ProductSummary: React.FC<ProductSummaryProps> = ({ product }) => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);
    const navigate = useNavigate();
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 pb-3 pt-2 hover:shadow-lg"
            onClick={() => navigate(`/product/${product.slug}`)}
        >
            <ImageRenderer
                src={product.sharedFiles?.[0]?.path}
                alt={product.name}
                className="h-[200px] w-full object-cover"
            />
            <Box className="flex justify-between py-2" gap={1}>
                <Typography
                    className="text-base font-semibold"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "3rem",
                    }}
                >
                    {product.name}
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
            <Typography className="text-lg font-semibold text-red-500">{formatCurrencyVND(product.price)}</Typography>

            <Typography
                className="mt-1 text-sm text-gray-500"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "1.5rem",
                }}
            >
                Người bán: <span className="font-semibold">{product.seller.name}</span>
            </Typography>
            <Typography
                className="mt-1 text-sm text-gray-500"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "1.5rem",
                }}
            >
                <LocationPin />
                <span className="font-semibold">{product.seller.address + ", " + product.seller.province}</span>
            </Typography>

            <Button
                startIcon={<AddShoppingCart />}
                variant="contained"
                fullWidth
                className="mt-3"
                onClick={handleAddToCart}
            >
                Thêm vào giỏ hàng
            </Button>
        </Box>
    );
};

export default ProductSummary;
