import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Product } from "~/entities";
import { formatCurrencyVND } from "~/utils/currency";
import ImageRenderer from "../image-renderer/image-renderer";
import BoxSection from "../section/box-section";

interface Props {
    product: Product;
    quantity: number;
}

const ProductCheckoutSummary: React.FC<Props> = ({ product, quantity }) => {
    return (
        <BoxSection sx={{ position: "relative" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <ImageRenderer
                    src={product.sharedFiles?.[0]?.path}
                    alt={product.name}
                    className="mr-4 h-24 w-24 rounded-xl object-cover"
                />

                <Box flex={1}>
                    <Typography fontWeight={700} className="cursor-pointer">
                        {product.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            Seller: {product.seller.name}
                        </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {product.note}
                    </Typography>
                </Box>

                <Typography fontWeight={700}>{formatCurrencyVND(product.price * quantity)}</Typography>
            </Stack>
        </BoxSection>
    );
};

export default ProductCheckoutSummary;
