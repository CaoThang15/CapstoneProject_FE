import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { BoxSection, ImageRenderer } from "~/components/common";
import { formatCurrencyVND } from "~/utils/currency";
import { ProductCartItem } from "../../pages/cart/types";

interface Props {
    product: ProductCartItem;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

export const CartItem: React.FC<Props> = ({ product, onIncrease, onDecrease, onRemove }) => {
    const handleNavigateToDetail = () => {
        window.location.href = `/product/${product.slug}`;
    };

    return (
        <BoxSection sx={{ position: "relative" }}>
            <IconButton
                size="small"
                onClick={() => onRemove(product.id)}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "text.secondary",
                    "&:hover": {
                        color: "error.main",
                        backgroundColor: "transparent",
                    },
                }}
                aria-label="remove item"
            >
                <DeleteOutline fontSize="small" />
            </IconButton>
            <Grid container alignItems="center" spacing={2}>
                <Box
                    className="mr-4 h-full w-48 cursor-pointer sm:block md:w-32 lg:w-48"
                    onClick={handleNavigateToDetail}
                >
                    <ImageRenderer
                        src={product.sharedFiles?.[0]?.path}
                        alt={product.name}
                        className="rounded-xl object-cover"
                    />
                </Box>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography fontWeight={700} onClick={handleNavigateToDetail} className="cursor-pointer">
                        {product.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Seller: {product.seller.name}
                        </Typography>
                        {/* <Chip label={`AI fair: ${formatCurrencyVND(product.aiFair)}`} size="small" color="primary" /> */}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {product.note}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                                size="small"
                                onClick={() => onDecrease(product.id)}
                                disabled={product.quantity <= 1}
                            >
                                <Remove />
                            </IconButton>
                            <Box
                                sx={{
                                    minWidth: 36,
                                    textAlign: "center",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 1,
                                    py: "2px",
                                }}
                            >
                                {product.quantity}
                            </Box>
                            <IconButton
                                size="small"
                                onClick={() => onIncrease(product.id)}
                                disabled={product.stockQuantity <= product.quantity}
                            >
                                <Add />
                            </IconButton>
                        </Stack>

                        <Box textAlign="right">
                            <Typography fontWeight={700}>
                                {formatCurrencyVND(product.price * product.quantity)}
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </BoxSection>
    );
};
