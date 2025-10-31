import { DiscountOutlined, LocalShipping, LockOutline, LoginOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { CartItem, CartItemError, CartItemSkeleton } from "~/components/cart";
import { BoxSection, LoadingContainer } from "~/components/common";
import { useAuth } from "~/contexts/auth.context";
import { useQueryGetProductCart } from "~/services/carts/hooks";
import { formatCurrencyVND } from "~/utils/currency";
import { useCheckout } from "../checkout/checkout.context";
import ApplyVoucherPopup from "./apply-voucher.popup";
import { LocalStorageCartItems } from "./types";

const CartPage: React.FC = () => {
    const { user } = useAuth();
    const [localCartProducts, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);
    const [isVoucherPopupOpen, setIsVoucherPopupOpen] = React.useState(false);
    const { voucher, setVoucher } = useCheckout();

    const productCart = useQueryGetProductCart(localCartProducts);

    const handleIncrease = (productId: number) => {
        saveLocalCartProducts((prev) => ({
            ...prev,
            [productId]: {
                quantity: (prev[productId]?.quantity ?? 0) + 1,
            },
        }));
    };

    const handleDecrease = (productId: number) => {
        saveLocalCartProducts((prev) => {
            const currentQty = prev[productId]?.quantity ?? 0;
            if (currentQty <= 1) return prev;

            return {
                ...prev,
                [productId]: {
                    quantity: currentQty - 1,
                },
            };
        });
    };

    const handleRemove = (id: number) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (!confirmed) return;

        saveLocalCartProducts((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const allLoading = productCart.some((item) => item.isLoading);
    const allError = productCart.every((item) => item.isError || !item.data);
    const allLoaded = !allLoading && !allError && productCart.length > 0;

    const { subtotal, total } = React.useMemo(() => {
        if (!allLoaded) return { subtotal: 0, savings: 0, total: 0 };

        let subtotal = 0;

        productCart.forEach((item) => {
            if (!item.data || item.isError) return;
            subtotal += item.data.price * item.data.quantity;
        });

        // const savings = subtotal * 0.05; // Example: 5% discount
        const total = subtotal;

        return { subtotal, total };
    }, [productCart, allLoaded]);

    return (
        <LoadingContainer isLoading={false}>
            <Box className="container mx-auto py-6">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <BoxSection>
                            <Typography variant="h6" fontWeight={700} mb={1}>
                                Your cart
                            </Typography>

                            <Stack spacing={2}>
                                {productCart.map((item) => {
                                    if (item.isLoading) {
                                        return <CartItemSkeleton key={item.data?.id} />;
                                    }
                                    if (item.isError || !item.data) {
                                        return <CartItemError key={item.data?.id} />;
                                    }
                                    return (
                                        <CartItem
                                            product={item.data}
                                            onIncrease={handleIncrease}
                                            onDecrease={handleDecrease}
                                            onRemove={handleRemove}
                                        />
                                    );
                                })}
                            </Stack>
                        </BoxSection>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} className="h-full">
                        <BoxSection className="h-full">
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight={700}>
                                    Order summary
                                </Typography>
                                <Chip
                                    label={
                                        <Typography fontSize={12} fontWeight={600} className="mb-0 text-white">
                                            Protected Checkout
                                        </Typography>
                                    }
                                    size="small"
                                    color="primary"
                                    className="px-1 py-1"
                                />
                            </Stack>

                            <Stack spacing={1} mt={1.5}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography fontWeight={700}>{formatCurrencyVND(subtotal)}</Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Shipping</Typography>
                                    <Typography>Free</Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Discount</Typography>
                                    <Typography>{formatCurrencyVND(0)}</Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography fontWeight={800}>Total</Typography>
                                    <Typography fontWeight={800}>{formatCurrencyVND(total)}</Typography>
                                </Stack>

                                {user ? (
                                    <>
                                        <Box mt={1}>
                                            <BoxSection className="flex items-center justify-between">
                                                <Button
                                                    startIcon={<DiscountOutlined />}
                                                    className="cursor-default hover:bg-white"
                                                    variant="text"
                                                    color="inherit"
                                                    disableRipple
                                                >
                                                    Promo code
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="inherit"
                                                    onClick={() => setIsVoucherPopupOpen(true)}
                                                >
                                                    Apply
                                                </Button>
                                            </BoxSection>
                                        </Box>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            className="!mt-3"
                                            onClick={() => {
                                                window.location.href = "/checkout";
                                            }}
                                            startIcon={<LockOutline />}
                                        >
                                            Proceed to checkout
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="inherit"
                                        className="!mt-3"
                                        onClick={() => (window.location.href = "/login")}
                                        startIcon={<LoginOutlined />}
                                    >
                                        Sign in to checkout
                                    </Button>
                                )}

                                <Stack direction="row" spacing={1} alignItems="center" className="!mt-3">
                                    <LocalShipping fontSize="small" color="action" />
                                    <Typography variant="caption" color="text.secondary">
                                        30-day returns • Seller verification • Secure payments
                                    </Typography>
                                </Stack>
                            </Stack>
                        </BoxSection>
                    </Grid>
                    {isVoucherPopupOpen && (
                        <ApplyVoucherPopup
                            onClose={() => setIsVoucherPopupOpen(false)}
                            open={isVoucherPopupOpen}
                            cartItems={productCart.map((product) => product.data)}
                            appliedVoucher={voucher}
                            onApply={(voucher) => setVoucher(voucher)}
                        />
                    )}
                </Grid>
            </Box>
        </LoadingContainer>
    );
};

export default CartPage;
