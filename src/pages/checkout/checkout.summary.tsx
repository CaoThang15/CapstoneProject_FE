import { Chip, Divider, Stack, Typography } from "@mui/material";
import { BoxSection } from "~/components/common";
import { formatCurrencyVND } from "~/utils/currency";
import { useCheckout } from "./checkout.context";

interface CheckoutSummaryProps {
    subtotal: number;
    shipping?: number;
    discount?: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ subtotal, shipping = 0, discount = 0 }) => {
    const { voucher } = useCheckout();
    const total = subtotal + shipping - discount;

    return (
        <BoxSection>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700}>
                    Order Summary
                </Typography>
                <Chip
                    label={
                        <Typography fontSize={12} fontWeight={600} color="#fff">
                            Buyer Protection
                        </Typography>
                    }
                    size="small"
                    color="primary"
                />
            </Stack>

            <Stack spacing={1.2} mt={1.5}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography fontWeight={600}>{formatCurrencyVND(subtotal)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Shipping</Typography>
                    <Typography>{shipping ? formatCurrencyVND(shipping) : "Free"}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Discount</Typography>
                    <Typography>-{formatCurrencyVND(voucher?.getDiscount(subtotal) || 0)}</Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>{formatCurrencyVND(total)}</Typography>
                </Stack>
            </Stack>
        </BoxSection>
    );
};
